# ==============================================================================
# TCHAK – SCRIPT D'INSTALLATION LOCALE (Windows PowerShell)
# Version : 1.0.0
# Description : Configure l'environnement TCHAK et lance le serveur local.
# ==============================================================================

Clear-Host
Write-Host "🚀 TCHAK – Initialisation de votre outil d'authenticité" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Gray
Write-Host ""

# 1. Définir les chemins
$INSTALL_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$DATA_DIR = "$env:USERPROFILE\TCHAK"

Write-Host "📂 Répertoire d'installation : $INSTALL_DIR"
Write-Host "📂 Dossier de données : $DATA_DIR"
Write-Host ""

# 2. Créer les dossiers de données
Write-Host "🛠️ Création de la structure de données..." -ForegroundColor Gray
if (!(Test-Path "$DATA_DIR\pdf")) { New-Item -ItemType Directory -Force -Path "$DATA_DIR\pdf" | Out-Null }
if (!(Test-Path "$DATA_DIR\certificates")) { New-Item -ItemType Directory -Force -Path "$DATA_DIR\certificates" | Out-Null }

# 3. Copier la configuration initiale
if (Test-Path "$INSTALL_DIR\config") {
    Write-Host "⚙️ Copie des profils et clés de sécurité..." -ForegroundColor Gray
    Copy-Item "$INSTALL_DIR\config\*" "$DATA_DIR\" -Force -ErrorAction SilentlyContinue
}

Write-Host "✅ Configuration terminée." -ForegroundColor Green
Write-Host ""

# 4. Rechercher un serveur HTTP
Write-Host "📡 Recherche d'un serveur local..." -ForegroundColor Gray

# Test Node (NPX)
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCheck) {
    Write-Host "✅ Serveur haute performance (Node.js) détecté." -ForegroundColor Green
    Set-Location "$INSTALL_DIR\app"
    Write-Host "🌐 Ouverture de l'outil sur : http://localhost:3000" -ForegroundColor Cyan
    Write-Host "--- Lancement automatique ---"
    Start-Process "http://localhost:3000"
    npx serve . -l 3000
}
# Test Python 3
else {
    $pythonCheck = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonCheck) {
        Write-Host "✅ Serveur standard (Python) détecté." -ForegroundColor Green
        Set-Location "$INSTALL_DIR\app"
        Write-Host "🌐 Ouverture de l'outil sur : http://localhost:8000" -ForegroundColor Cyan
        Write-Host "--- Lancement automatique ---"
        Start-Process "http://localhost:8000"
        python -m http.server 8000
    }
    else {
        Write-Host "❌ Erreur : Aucun serveur HTTP trouvé." -ForegroundColor Red
        Write-Host "Veuillez installer Node.js (https://nodejs.org) ou Python."
        Write-Host "Consultez README_INSTALL.md pour plus d'informations."
        Pause
        exit
    }
}
