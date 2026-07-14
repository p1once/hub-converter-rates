import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCryptoSnapshot } from '../collector.mjs';

test('construit des prix USD multi-marchés sans dépendre de CoinGecko', () => {
  const snapshot = buildCryptoSnapshot([
    { exchange: 'kraken', base: 'USDT', quote: 'USD', last: 0.9998, quoteVolume: 50_000_000 },
    { exchange: 'kraken', base: 'BTC', quote: 'USD', last: 64_000, quoteVolume: 100_000_000 },
    { exchange: 'binance', base: 'BTC', quote: 'USDT', last: 64_100, quoteVolume: 200_000_000 },
    { exchange: 'gate', base: 'APTM', quote: 'USDT', last: 0.2375, quoteVolume: 500_000 },
    { exchange: 'mexc', base: 'APTM', quote: 'USDT', last: 0.2385, quoteVolume: 900_000 },
    { exchange: 'bad-source', base: 'APTM', quote: 'USDT', last: 99, quoteVolume: 1 }
  ], '2026-07-14T20:00:00.000Z');

  const aptm = snapshot.assets.find(asset => asset.code === 'APTM');
  assert.ok(aptm);
  assert.equal(aptm.rateKey, 'market:aptm');
  assert.ok(aptm.usd > 0.23 && aptm.usd < 0.25);
  assert.deepEqual(aptm.sources, ['gate', 'mexc']);
  assert.equal(snapshot.rates['market:aptm'].usd, aptm.usd);
  assert.equal(snapshot.rates.APTM.usd, aptm.usd);
});

test('ignore les devises fiat et les marchés invalides', () => {
  const snapshot = buildCryptoSnapshot([
    { exchange: 'kraken', base: 'EUR', quote: 'USD', last: 1.1, quoteVolume: 10_000 },
    { exchange: 'kraken', base: 'ETH', quote: 'USD', last: 2_000, quoteVolume: 10_000 },
    { exchange: 'invalid', base: 'BAD', quote: 'USD', last: 0, quoteVolume: 1 }
  ]);

  assert.equal(snapshot.assets.some(asset => asset.code === 'EUR'), false);
  assert.equal(snapshot.assets.some(asset => asset.code === 'BAD'), false);
  assert.equal(snapshot.rates.ETH.usd, 2_000);
});
