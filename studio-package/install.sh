#!/bin/bash

# ==============================================================================
# TCHAK – SCRIPT D'INSTALLATION LOCALE (macOS / Linux)
# Version : 1.0.0
# Description : Configure l'environnement TCHAK et lance le serveur local.
# ==============================================================================

clear
echo "🚀 TCHAK – Initialisation de votre outil d'authenticité"
echo "=========================================================="
echo ""

# 1. Détecter le répertoire d'installation
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$HOME/TCHAK"

echo "📂 Répertoire d'installation : $INSTALL_DIR"
echo "📂 Dossier de données : $DATA_DIR"
echo ""

# 2. Créer les dossiers de données
echo "🛠️ Création de la structure de données..."
mkdir -p "$DATA_DIR/pdf"
mkdir -p "$DATA_DIR/certificates"

# 3. Copier la configuration initiale (si présente)
if [ -d "$INSTALL_DIR/config" ]; then
    echo "⚙️ Copie des profils et clés de sécurité..."
    cp -r "$INSTALL_DIR/config/"* "$DATA_DIR/"
fi

echo "✅ Configuration terminée."
echo ""

# 4. Rechercher un serveur HTTP
echo "📡 Recherche d'un serveur local..."

# Test NPX (Node.js)
if command -v npx &> /dev/null; then
    echo "💡 Serveur haute performance (Node.js) détecté."
    cd "$INSTALL_DIR/app"
    echo "🌐 Ouverture de l'outil sur : http://localhost:3000"
    echo "--- Lancement ---"
    npx serve . -l 3000
    
# Test Python 3
elif command -v python3 &> /dev/null; then
    echo "💡 Serveur standard (Python 3) détecté."
    cd "$INSTALL_DIR/app"
    echo "🌐 Ouverture de l'outil sur : http://localhost:8000"
    echo "--- Lancement ---"
    python3 -m http.server 8000
    
else
    echo "❌ Erreur : Aucun serveur HTTP trouvé."
    echo "Veuillez installer Node.js (https://nodejs.org) ou Python 3."
    echo "Consultez README_INSTALL.md pour plus d'informations."
    exit 1
fi
