# ARCHITECTURE: TCHAK FREE V0

## 1. Arborescence du Projet

```text
tchak-free/
├── landing/                # React (Vite) - Formulaire d'onboarding
├── electron-app/           # Application Electron
│   ├── main.js             # Main Process (FS, Window, PDF)
│   ├── preload.js          # IPC Bridge
│   ├── renderer/           # React Renderer (UI Certificats)
│   └── data/               # Stockage local (non versionné)
│       ├── chain.json
│       └── certificates.json
├── netlify-functions/      # Générateur de ZIP personnalisé
├── supabase/               # Migrations et Schéma
└── .env.example            # Variables d'environnement
```

## 2. Bases de Données & Stockage

### Supabase (Cloud - Landing uniquement)
- **artists** : `id`, `email`, `signature_png` (base64/storage), `created_at`.
- **installations** : `id`, `artist_id`, `os_type`, `version`, `seed_hash`.

### Local JSON (Electron - Offline)
**`chain.json`** :
```json
{
  "seed": "valeur_initiale_générée_à_l_installation",
  "lastId": "SHA256_du_dernier_certificat",
  "history": ["id1", "id2"]
}
```

**`certificates.json`** :
```json
{
  "certificates": [
    {
      "id": "SHA256_hash",
      "title": "Nom de l'œuvre",
      "timestamp": "2026-04-12T18:00:00Z",
      "pdfPath": "./exports/cert_1.pdf"
    }
  ]
}
```

## 3. Flux Onboarding ➔ Émission

1. **Onboarding** : L'artiste remplit son profil sur la landing page et dessine sa signature.
2. **ZIP Generation** : La Netlify Function packager l'exécutable Electron avec un fichier `artist_config.json` injecté contenant le nom de l'artiste, sa signature PNG et une `seed_hash` unique.
3. **Émission Offline** :
   - L'artiste ouvre l'app. L'UI React interroge `certificates.json`.
   - **Check Quota** : Compte le nombre d'entrées avec `timestamp` dans le mois courant. Si >= 10, le bouton "Générer" est désactivé.
   - **Hash Chain** : Le nouvel ID est calculé : `SHA256(chain.lastId + current_timestamp)`.
   - **PDF** : Le Main Process génère le PDF en fusionnant les données de l'œuvre et la signature PNG stockée localement.
   - **Update** : `chain.json` et `certificates.json` sont mis à jour sur le disque.

## 4. Architecture Electron
- **Main Process** : Gère les accès au système de fichiers (lecture/écriture JSON) et l'impression PDF via `webContents.printToPDF`.
- **Renderer Process** : Interface React pour la saisie des métadonnées de l'œuvre.
- **IPC** : Communication sécurisée pour ne pas exposer `fs` directement au renderer.
