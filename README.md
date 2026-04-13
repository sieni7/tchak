# 🎨 TCHAK - Plateforme de Certification d'Authenticité

TCHAK est une plateforme offline-first permettant aux artistes de générer des certificats d'authenticité sécurisés par un chaînage cryptographique local (SHA256).

## 🗂️ Structure du Projet

- `landing/` : Site vitrine public (déployé sur Netlify)
- `app/` : Application Studio locale (PWA / Offline-first)
- `netlify-functions/` : Fonctions serverless (Génération du ZIP d'installation)
- `lib/` : Utilitaires partagés (ex: moteur cryptographique)

## 🚀 Développement Local

Pour tester séparément les deux environnements :

### 1. Landing Page (Vitrine)
```bash
npm run dev:landing
```
*Accessible sur http://localhost:3000*

### 2. Studio (Application Artiste)
```bash
npm run dev:app
```
*Accessible sur http://localhost:3000*

### 3. Fonctions Netlify (Génération ZIP)
```bash
npm run dev:netlify
```
Nécessite [Netlify CLI](https://docs.netlify.com/cli/get-started/).

## ✅ Tests

Un script de vérification s'assure de la présence des fichiers vitaux avant le déploiement :
```bash
npm run test:local
```

## ☁️ Déploiement

Le projet est configuré pour se déployer automatiquement sur Netlify à chaque push sur la branche `main`.
Les variables d'environnement requises (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `TCHAK_PLAN`) doivent être configurées dans le dashboard Netlify.
