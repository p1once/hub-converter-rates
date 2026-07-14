import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(ROOT, 'public', 'latest');
const REQUEST_TIMEOUT_MS = 20_000;
const MINIMUM_MARKETS = 100;
const MINIMUM_ASSETS = 50;
const FIAT_CODES = new Set([
  'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'CNY', 'CNH', 'HKD',
  'SGD', 'KRW', 'INR', 'BRL', 'MXN', 'TRY', 'RUB', 'ZAR', 'AED', 'ARS', 'PLN'
]);
const CORE_NAMES = {
  BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana', XRP: 'XRP', ADA: 'Cardano',
  DOGE: 'Dogecoin', DOT: 'Polkadot', LTC: 'Litecoin', BCH: 'Bitcoin Cash',
  LINK: 'Chainlink', XLM: 'Stellar', AVAX: 'Avalanche', USDT: 'Tether',
  USDC: 'USDC', DAI: 'Dai', BNB: 'BNB', TRX: 'TRON', TON: 'Toncoin'
};
const REQUIRED_CORE_CODES = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'DOT', 'LTC', 'BCH', 'LINK', 'XLM', 'AVAX'];

const sourceCollectors = [
  ['binance', collectBinance],
  ['kraken', collectKraken],
  ['okx', collectOkx],
  ['bybit', collectBybit],
  ['kucoin', collectKucoin],
  ['gate', collectGate],
  ['mexc', collectMexc]
];

export async function collectSnapshots({ fetchImpl = fetch, now = new Date() } = {}) {
  const generatedAt = now.toISOString();
  const settled = await Promise.allSettled(
    sourceCollectors.map(async ([name, collector]) => ({ name, markets: await collector(fetchImpl) }))
  );
  const health = {};
  const markets = [];

  settled.forEach((result, index) => {
    const name = sourceCollectors[index][0];
    if (result.status === 'fulfilled' && result.value.markets.length > 0) {
      markets.push(...result.value.markets);
      health[name] = { ok: true, markets: result.value.markets.length };
    } else {
      health[name] = {
        ok: false,
        markets: 0,
        error: result.status === 'rejected' ? String(result.reason?.message || result.reason) : 'Réponse vide'
      };
    }
  });

  if (markets.length < MINIMUM_MARKETS) {
    throw new Error(`Collecte crypto insuffisante: ${markets.length} marchés`);
  }

  const crypto = buildCryptoSnapshot(markets, generatedAt);
  if (crypto.assets.length < MINIMUM_ASSETS) {
    throw new Error(`Catalogue crypto insuffisant: ${crypto.assets.length} actifs`);
  }
  const missingCore = REQUIRED_CORE_CODES.filter(code => !Number(crypto.rates[code]?.usd));
  if (missingCore.length > 0) throw new Error(`Cours principaux absents: ${missingCore.join(', ')}`);

  let fiat = null;
  try {
    fiat = await collectFiat(fetchImpl, generatedAt);
    health.fiat = { ok: true, rates: Object.keys(fiat.rates).length };
  } catch (error) {
    fiat = await readPreviousJson('fiat.json');
    if (!fiat?.rates) throw error;
    health.fiat = { ok: false, cached: true, error: String(error?.message || error) };
  }

  const meta = {
    schemaVersion: 1,
    generatedAt,
    cryptoAssets: crypto.assets.length,
    cryptoMarkets: markets.length,
    fiatRates: Object.keys(fiat.rates).length,
    sources: health
  };

  return {
    catalog: {
      schemaVersion: 1,
      generatedAt,
      count: crypto.assets.length,
      assets: crypto.assets
    },
    crypto: {
      schemaVersion: 1,
      generatedAt,
      base: 'USD',
      count: crypto.assets.length,
      rates: crypto.rates
    },
    fiat,
    meta
  };
}

export function buildCryptoSnapshot(rawMarkets, generatedAt = new Date().toISOString()) {
  const markets = rawMarkets.map(normalizeMarket).filter(Boolean);
  const known = new Map([['USD', 1]]);

  for (let iteration = 0; iteration < 8; iteration += 1) {
    const candidates = new Map();
    for (const market of markets) {
      if (known.has(market.quote)) addCandidate(candidates, market.base, market.last * known.get(market.quote), market);
      if (known.has(market.base)) addCandidate(candidates, market.quote, known.get(market.base) / market.last, market);
    }

    let added = 0;
    for (const [code, values] of candidates) {
      const value = robustMedian(values.map(candidate => candidate.value));
      if (!Number.isFinite(value) || value <= 0) continue;
      if (!known.has(code)) added += 1;
      known.set(code, value);
    }
    if (added === 0) break;
  }

  const finalCandidates = new Map();
  for (const market of markets) {
    const quoteUsd = known.get(market.quote);
    if (!Number.isFinite(quoteUsd) || quoteUsd <= 0) continue;
    addCandidate(finalCandidates, market.base, market.last * quoteUsd, market);
  }

  const generatedAtMs = Date.parse(generatedAt) || Date.now();
  const rows = [];
  for (const [code, candidates] of finalCandidates) {
    if (code === 'USD' || FIAT_CODES.has(code)) continue;
    const sourcePrices = filterRobustCandidates(deduplicateSourcePrices(candidates));
    const usd = robustMedian(sourcePrices.map(candidate => candidate.value));
    if (!Number.isFinite(usd) || usd <= 0) continue;
    const sources = [...new Set(sourcePrices.map(candidate => candidate.market.exchange))].sort();
    const liquidity = sourcePrices.reduce((sum, candidate) => {
      const volume = Number(candidate.market.quoteVolume) * Number(known.get(candidate.market.quote) || 0);
      return sum + (Number.isFinite(volume) && volume > 0 ? Math.log10(volume + 1) : 0);
    }, 0);
    const id = `market:${code.toLowerCase()}`;
    rows.push({
      id,
      rateKey: id,
      code,
      name: CORE_NAMES[code] || code,
      usd,
      sources,
      sourceCount: sources.length,
      marketCount: sourcePrices.length,
      liquidity,
      updatedAt: generatedAtMs
    });
  }

  rows.sort((a, b) => b.liquidity - a.liquidity || b.sourceCount - a.sourceCount || a.code.localeCompare(b.code));
  const assets = rows.map((row, index) => ({
    id: row.id,
    rateKey: row.rateKey,
    code: row.code,
    name: row.name,
    rank: index + 1,
    usd: row.usd,
    sources: row.sources,
    sourceCount: row.sourceCount,
    marketCount: row.marketCount,
    updatedAt: row.updatedAt
  }));
  const rates = Object.fromEntries(rows.flatMap(row => [
    [row.rateKey, { usd: row.usd, coinId: row.id, sources: row.sources, updatedAt: row.updatedAt }],
    [row.code, { usd: row.usd, coinId: row.id, sources: row.sources, updatedAt: row.updatedAt }]
  ]));
  return { assets, rates };
}

function normalizeMarket(market) {
  const base = normalizeCode(market?.base);
  const quote = normalizeCode(market?.quote);
  const last = Number(market?.last);
  if (!base || !quote || base === quote || !Number.isFinite(last) || last <= 0) return null;
  return {
    exchange: String(market.exchange || 'unknown'),
    symbol: String(market.symbol || `${base}/${quote}`),
    base,
    quote,
    last,
    quoteVolume: Number(market.quoteVolume) || 0
  };
}

function normalizeCode(value) {
  const code = String(value || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{1,24}$/.test(code)) return '';
  if (code === 'XBT') return 'BTC';
  if (code === 'XDG') return 'DOGE';
  return code;
}

function addCandidate(map, code, value, market) {
  if (!Number.isFinite(value) || value <= 0) return;
  if (!map.has(code)) map.set(code, []);
  map.get(code).push({ value, market });
}

function deduplicateSourcePrices(candidates) {
  const bySource = new Map();
  for (const candidate of candidates) {
    const previous = bySource.get(candidate.market.exchange);
    if (!previous || candidate.market.quoteVolume > previous.market.quoteVolume) {
      bySource.set(candidate.market.exchange, candidate);
    }
  }
  return [...bySource.values()];
}

function filterRobustCandidates(candidates) {
  if (candidates.length < 3) return candidates;
  const center = robustMedian(candidates.map(candidate => candidate.value));
  const filtered = candidates.filter(candidate => candidate.value >= center / 20 && candidate.value <= center * 20);
  return filtered.length ? filtered : candidates;
}

function robustMedian(values) {
  const sorted = values.filter(value => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return NaN;
  const rawMedian = median(sorted);
  const filtered = sorted.filter(value => value >= rawMedian / 20 && value <= rawMedian * 20);
  return median(filtered.length ? filtered : sorted);
}

function median(sorted) {
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

async function collectFiat(fetchImpl, generatedAt) {
  const rows = await fetchJson(fetchImpl, 'https://api.frankfurter.dev/v2/rates?base=EUR');
  const rates = { EUR: 1 };
  let date = null;
  for (const row of Array.isArray(rows) ? rows : []) {
    const quote = normalizeCode(row?.quote);
    const rate = Number(row?.rate);
    if (quote && Number.isFinite(rate) && rate > 0) rates[quote] = rate;
    if (row?.date) date = row.date;
  }
  if (!rates.USD || Object.keys(rates).length < 20) throw new Error('Réponse fiat insuffisante');
  return { schemaVersion: 1, generatedAt, date, base: 'EUR', rates };
}

async function collectBinance(fetchImpl) {
  const [info, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://api.binance.com/api/v3/exchangeInfo'),
    fetchJson(fetchImpl, 'https://api.binance.com/api/v3/ticker/24hr')
  ]);
  const bySymbol = new Map((info.symbols || []).filter(row => row.status === 'TRADING').map(row => [row.symbol, row]));
  return (tickers || []).map(ticker => {
    const market = bySymbol.get(ticker.symbol);
    return market && toMarket('binance', ticker.symbol, market.baseAsset, market.quoteAsset, ticker.lastPrice, ticker.quoteVolume);
  }).filter(Boolean);
}

async function collectKraken(fetchImpl) {
  const [pairs, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://api.kraken.com/0/public/AssetPairs'),
    fetchJson(fetchImpl, 'https://api.kraken.com/0/public/Ticker')
  ]);
  if (pairs.error?.length || tickers.error?.length) throw new Error([...(pairs.error || []), ...(tickers.error || [])].join(', '));
  return Object.entries(pairs.result || {}).map(([id, pair]) => {
    const ticker = tickers.result?.[id] || tickers.result?.[pair.altname];
    const [base, quote] = String(pair.wsname || '').split('/');
    return ticker && toMarket('kraken', pair.altname || id, base, quote, ticker.c?.[0], Number(ticker.v?.[1]) * Number(ticker.p?.[1]));
  }).filter(Boolean);
}

async function collectOkx(fetchImpl) {
  const [instruments, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://www.okx.com/api/v5/public/instruments?instType=SPOT'),
    fetchJson(fetchImpl, 'https://www.okx.com/api/v5/market/tickers?instType=SPOT')
  ]);
  const byId = new Map((instruments.data || []).filter(row => row.state === 'live').map(row => [row.instId, row]));
  return (tickers.data || []).map(ticker => {
    const market = byId.get(ticker.instId);
    return market && toMarket('okx', ticker.instId, market.baseCcy, market.quoteCcy, ticker.last, ticker.volCcy24h);
  }).filter(Boolean);
}

async function collectBybit(fetchImpl) {
  const instruments = [];
  let cursor = '';
  do {
    const suffix = cursor ? `&cursor=${encodeURIComponent(cursor)}` : '';
    const page = await fetchJson(fetchImpl, `https://api.bybit.com/v5/market/instruments-info?category=spot&limit=1000${suffix}`);
    instruments.push(...(page.result?.list || []));
    cursor = page.result?.nextPageCursor || '';
  } while (cursor && instruments.length < 20_000);
  const tickers = await fetchJson(fetchImpl, 'https://api.bybit.com/v5/market/tickers?category=spot');
  const bySymbol = new Map(instruments.filter(row => row.status === 'Trading').map(row => [row.symbol, row]));
  return (tickers.result?.list || []).map(ticker => {
    const market = bySymbol.get(ticker.symbol);
    return market && toMarket('bybit', ticker.symbol, market.baseCoin, market.quoteCoin, ticker.lastPrice, ticker.turnover24h);
  }).filter(Boolean);
}

async function collectKucoin(fetchImpl) {
  const [symbols, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://api.kucoin.com/api/v2/symbols'),
    fetchJson(fetchImpl, 'https://api.kucoin.com/api/v1/market/allTickers')
  ]);
  const bySymbol = new Map((symbols.data || []).filter(row => row.enableTrading).map(row => [row.symbol, row]));
  return (tickers.data?.ticker || []).map(ticker => {
    const market = bySymbol.get(ticker.symbol);
    return market && toMarket('kucoin', ticker.symbol, market.baseCurrency, market.quoteCurrency, ticker.last, ticker.volValue);
  }).filter(Boolean);
}

async function collectGate(fetchImpl) {
  const [pairs, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://api.gateio.ws/api/v4/spot/currency_pairs'),
    fetchJson(fetchImpl, 'https://api.gateio.ws/api/v4/spot/tickers')
  ]);
  const byId = new Map((pairs || []).filter(row => row.trade_status === 'tradable').map(row => [row.id, row]));
  return (tickers || []).map(ticker => {
    const market = byId.get(ticker.currency_pair);
    return market && toMarket('gate', ticker.currency_pair, market.base, market.quote, ticker.last, ticker.quote_volume);
  }).filter(Boolean);
}

async function collectMexc(fetchImpl) {
  const [info, tickers] = await Promise.all([
    fetchJson(fetchImpl, 'https://api.mexc.com/api/v3/exchangeInfo'),
    fetchJson(fetchImpl, 'https://api.mexc.com/api/v3/ticker/24hr')
  ]);
  const bySymbol = new Map((info.symbols || []).filter(row => row.status === '1' || row.status === 'ENABLED').map(row => [row.symbol, row]));
  return (tickers || []).map(ticker => {
    const market = bySymbol.get(ticker.symbol);
    return market && toMarket('mexc', ticker.symbol, market.baseAsset, market.quoteAsset, ticker.lastPrice, ticker.quoteVolume);
  }).filter(Boolean);
}

function toMarket(exchange, symbol, base, quote, last, quoteVolume) {
  return normalizeMarket({ exchange, symbol, base, quote, last, quoteVolume });
}

async function fetchJson(fetchImpl, url, attempt = 0) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json', 'User-Agent': 'HubConverterRates/1.0' }
    });
    if (!response.ok) throw new Error(`${new URL(url).hostname}: HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (attempt < 1) {
      await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      return fetchJson(fetchImpl, url, attempt + 1);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function readPreviousJson(filename) {
  try {
    return JSON.parse(await readFile(path.join(OUTPUT_DIR, filename), 'utf8'));
  } catch {
    return null;
  }
}

async function writeSnapshots(snapshots) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const files = {
    'snapshot.json': {
      schemaVersion: 1,
      generatedAt: snapshots.meta.generatedAt,
      catalog: snapshots.catalog,
      crypto: snapshots.crypto,
      fiat: snapshots.fiat,
      meta: snapshots.meta
    },
    'catalog.json': snapshots.catalog,
    'crypto.json': snapshots.crypto,
    'fiat.json': snapshots.fiat,
    'meta.json': snapshots.meta
  };
  await Promise.all(Object.entries(files).map(([filename, value]) =>
    writeFile(path.join(OUTPUT_DIR, filename), `${JSON.stringify(value)}\n`, 'utf8')
  ));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const snapshots = await collectSnapshots();
  await writeSnapshots(snapshots);
  console.log(`Collected ${snapshots.meta.cryptoAssets} crypto assets from ${snapshots.meta.cryptoMarkets} markets and ${snapshots.meta.fiatRates} fiat rates.`);
}
