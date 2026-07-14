# Hub Converter Rates

Collecteur de taux sans clé API pour Hub Converter. Il agrège les marchés publics de plusieurs exchanges, calcule un prix USD médian robuste et publie des snapshots statiques.

## Fichiers publiés

- `public/latest/snapshot.json` : bundle atomique utilisé par l’extension pour éviter tout mélange de générations entre fichiers.
- `public/latest/catalog.json` : catalogue des actifs ayant un marché réel.
- `public/latest/crypto.json` : taux crypto agrégés en USD.
- `public/latest/fiat.json` : taux fiat institutionnels avec base EUR.
- `public/latest/meta.json` : état et couverture des sources.

Le dépôt ne contient aucune clé ni donnée utilisateur. Les snapshots rapides sont déployés sur GitHub Pages toutes les cinq minutes. Un snapshot de secours est conservé dans le dépôt toutes les six heures pour les miroirs `raw.githubusercontent.com` et jsDelivr.

## Exécution locale

```bash
npm ci
npm test
npm run collect
```

Licence MIT.
