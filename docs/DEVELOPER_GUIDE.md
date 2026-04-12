# Guide Développeur : TCHAK FREE

## Architecture
- **Frontend Landing** : React (Vite) déployé sur Netlify.
- **Backend Onboarding** : Supabase (Tables `artists`, `installations`).
- **App Desktop** : Electron + React.
- **Trust Layer** : Chaîne SHA256 déterministe locale.

## Installation au développement
1. Clonez le dépôt.
2. `npm install` à la racine pour les dépendances partagées.
3. Configuration `.env` (voir `.env.example`).

## Build et Distribution
- Développement : `npm run dev:electron`.
- Distribution Optimisée : `npm run dist:optimized`.

## Structure des données
Les données persistent dans le dossier AppData :
- `certificates.json` : Quota et historique.
- `chain.json` : Racine de confiance.
