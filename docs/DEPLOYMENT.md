# Guide de Déploiement : TCHAK FREE

## 1. Supabase
- Créez un projet sur Supabase.
- Exécutez le script dans `supabase/migrations/001_initial_schema.sql` dans le SQL Editor.
- Récupérez `SUPABASE_URL` et `SUPABASE_ANON_KEY`.

## 2. Netlify
- Connectez votre dépôt à Netlify.
- Configurez les variables d'environnement :
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Déterminez le dossier de build : `landing/dist`.
- Déterminez le dossier des fonctions : `netlify-functions`.

## 3. Distribution
- Générez les binaires via `npm run dist:optimized`.
- Envoyez les installeurs sur votre stockage de téléchargement (Netlify LFS, S3 ou directement dans le dossier public de la landing).
