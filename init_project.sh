#!/bin/bash

# TCHAK FREE V0 - Script d'Initialisation
# Objectif : Scaffolder l'environnement de développement hybride Cloud/Electron.

echo "🚀 Initialisation du projet TCHAK FREE V0..."

# 1. Vérification Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Erreur : Node.js version 16 ou supérieure est requise."
    exit 1
fi
echo "✅ Node.js version $NODE_VERSION détectée."

# 2. Création de l'arborescence
mkdir -p landing electron-app/renderer electron-app/data netlify-functions supabase
echo "✅ Arborescence créée."

# 3. Initialisation Landing (Stubs)
cat <<EOT > landing/package.json
{
  "name": "tchak-landing",
  "version": "1.0.0",
  "scripts": {
    "dev": "echo 'Starting Vite for Landing...'"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.0.0"
  }
}
EOT

# 4. Initialisation Electron (Stubs fonctionnels)
cat <<EOT > electron-app/package.json
{
  "name": "tchak-electron",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "electron:dev": "electron .",
    "build": "echo 'Building Electron App...'"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "electron": "^25.0.0"
  }
}
EOT

cat <<EOT > electron-app/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
EOT

touch electron-app/preload.js

cat <<EOT > electron-app/renderer/index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TCHAK FREE - READY</title>
</head>
<body style="background: #1a1a1a; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
    <h1>🚀 TCHAK READY</h1>
</body>
</html>
EOT

# 5. Données initiales & Secrets
if [ -f .env.example ]; then
    cp .env.example .env
fi

# Génération d'une seed aléatoire pour le développement
RANDOM_SEED=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
cat <<EOT > electron-app/data/chain_seed.json
{
  "seed": "$RANDOM_SEED",
  "environment": "development"
}
EOT

# 6. Global Package JSON pour les scripts orchestrateurs
cat <<EOT > package.json
{
  "name": "tchak-project-root",
  "private": true,
  "scripts": {
    "dev:landing": "cd landing && npm run dev",
    "dev:electron": "cd electron-app && npm run electron:dev",
    "build:electron": "cd electron-app && npm run build"
  }
}
EOT

echo "-------------------------------------------------------"
echo "✨ Projet initialisé avec succès."
echo "Pour démarrer :"
echo "1. Ouvrez un terminal : npm run dev:landing"
echo "2. Ouvrez un autre terminal : npm run dev:electron"
echo "-------------------------------------------------------"
