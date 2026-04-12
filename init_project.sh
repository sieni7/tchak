#!/bin/bash

echo "🚀 TCHAK FREE V0 – Initialisation"

# Créer le dossier du projet
mkdir -p tchak-free-v0
cd tchak-free-v0

# Copier le prototype index.html (à fournir séparément)
echo "✅ Copier index.html dans ce dossier"
echo "📁 Structure prête pour le développement"

# Vérifier la présence du fichier
if [ -f "index.html" ]; then
    echo "✅ Prototype détecté – prêt pour la suite"
else
    echo "⚠️ index.html manquant – placer le prototype ici"
fi

echo "🚀 Commande : npx serve . pour lancer le serveur local"
