# TCHAK FREE — Sprint 1 (Build Fonctionnel)

## Objectifs Atteints
- **Landing Page** : Système d'onboarding multi-étapes avec capture de signature.
- **ZIP Generator** : Infrastructure Netlify Function (stub) prête pour l'injection.
- **Electron App** : 
  - Moteur de hashage déterministe (SHA256 Chain).
  - Quota local de 10 certificats/mois.
  - Export PDF via `printToPDF`.
  - Prévisualisation WYSIWYG.

## Installation & Test

### 1. Landing Page
```bash
cd landing
npm install
npm run dev
```
Accédez à `http://localhost:5173`. Suivez les 5 étapes d'onboarding.

### 2. Electron App
```bash
cd electron-app
npm install
npm run electron:dev
```
L'application s'ouvre. Vous pouvez générer votre premier certificat. L'export PDF sera sauvegardé dans votre dossier **Documents**.

## Structure des données (Local)
Les données sont stockées dans le dossier `userData` d'Electron (ex: `%APPDATA%/tchak-electron/data` sur Windows) :
- `certificates.json` : Historique des émissions et timestamps (pour le quota).
- `chain.json` : Graine (`seed`) et dernier ID (`lastId`) pour la chaîne SHA256.

## Prochaines Étapes
- **Sprint 2** : Amélioration du design du certificat (Templates Vintage/Art Déco).
- **Sprint 3** : Web Share API pour envoyer le PDF directement depuis l'app.
