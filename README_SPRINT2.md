# TCHAK FREE — Sprint 2 (Distribution & Personnalisation)

## Nouveautés du Sprint
- **Génération ZIP Réelle** : La Netlify Function utilise désormais `JSZip` pour injecter dynamiquement le nom de l'artiste et la graine de confiance dans le package.
- **Thèmes Certificats** : Support des thèmes **Classique** (Sérif) et **Moderne** (Sans-sérif).
- **Distribution** : Configuration d'`electron-builder` pour produire des installateurs synchronisés.
- **Gestion des Données** : Nouvelle fonction d'exportation globale (Sauvegarde ZIP) dans le Dashboard.

## Instructions de Build (Distribution)

### 1. Préparer l'environnement
Assurez-vous d'avoir installé les nouvelles dépendances :
```bash
cd electron-app
npm install
```

### 2. Produire les installeurs
Pour générer les exécutables pour votre plateforme actuelle :
```bash
npm run dist
```
Les fichiers seront disponibles dans le dossier `electron-app/dist/`.

### 3. Déploiement Cloud (Netlify)
La fonction dans `netlify-functions/generate-zip.js` doit être déployée sur Netlify. Elle s'attend à trouver l'installeur binaire dans son environnement (ou via un stockage externe configuré).

## Tests du Sprint 2
1. **Onboarding** : Vérifier que le ZIP téléchargé contient bien `config/artist.json`.
2. **Styles** : Alterner entre Classique et Moderne dans l'app et vérifier le footer du PDF.
3. **Backup** : Cliquer sur "Exporter les données" et vérifier que le ZIP contient `chain.json`.

## Prochaines Étapes
- **Sprint 3** : Partage natif (Web Share API) et synchronisation cloud optionnelle.
