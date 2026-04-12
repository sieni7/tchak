# PROJECT_CONTEXT: TCHAK FREE V0

## 1. Identité du Projet
- **Nom** : TCHAK FREE
- **Vision** : Offrir aux artistes indépendants un outil de certification d'authenticité gratuit, sécurisé et 100% hors-ligne.
- **Modèle** : Hybride "Cloud Landing -> Local App".

## 2. Double Système Produit
Le projet s'articule autour de deux piliers :

### Cloud Landing (Onboarding & Distribution)
- **Rôle** : Acquisition utilisateur, collecte des données profils et génération personnalisée.
- **Flux** : Formulaire multi-étapes -> Capture de signature manuscrite (Canvas) -> Génération d'un ZIP Electron personnalisé via Netlify Functions.
- **Stockage** : Supabase pour l'onboarding et les analytics.

### Electron Local (App de Certification)
- **Rôle** : Émission de certificats PDF sans connexion internet.
- **Sécurité** : Chaîne de hashage SHA256 (`IDn = SHA256(IDn-1 + timestamp)`).
- **Limitation** : Quota de **10 certificats par mois** géré localement.
- **Migration** : Système de mise à jour par réinstallation avec conservation des données (dossier `data/`).

## 3. KPIs de Performance
- **Génération ZIP** : < 3 secondes.
- **Installation Locale** : < 2 minutes.
- **Génération Certificat** : < 10 secondes.

## 4. Contraintes & Isolation
- **Offline Total** : L'application Electron ne doit avoir aucune dépendance au runtime cloud.
- **Intégrité** : La chaîne SHA256 garantit qu'on ne peut pas insérer de certificat "fantôme" a posteriori.
- **Focus** : Support exclusif des tableaux et œuvres visuelles pour le MVP.
