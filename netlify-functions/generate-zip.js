const JSZip  = require('jszip');
const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');

// ── Supabase REST helper (pas de client JS, juste fetch natif Node18) ─────────
async function insertArtist(profile, artistId, seed) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.warn('⚠️  Supabase non configuré – enregistrement ignoré.');
        return null;
    }

    try {
        // 1. Insérer l'artiste
        const artRes = await fetch(`${SUPABASE_URL}/rest/v1/artists`, {
            method: 'POST',
            headers: {
                'apikey':        SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type':  'application/json',
                'Prefer':        'return=representation'
            },
            body: JSON.stringify({
                name:      `${profile.firstName} ${profile.lastName}`.trim(),
                email:     profile.email,
                art_style: (profile.techniques || []).join(', ') || null
            })
        });

        if (!artRes.ok) {
            const err = await artRes.text();
            // Email déjà existant → on récupère l'artiste existant
            if (artRes.status === 409 || err.includes('unique')) {
                console.log('ℹ️  Artiste déjà enregistré, on récupère son ID...');
                const getRes = await fetch(
                    `${SUPABASE_URL}/rest/v1/artists?email=eq.${encodeURIComponent(profile.email)}&select=id`,
                    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
                );
                const existing = await getRes.json();
                if (existing && existing[0]) return existing[0].id;
            }
            console.error('Supabase artists error:', err);
            return null;
        }

        const artistData = await artRes.json();
        const dbArtistId = artistData[0]?.id;

        // 2. Insérer l'installation
        if (dbArtistId) {
            await fetch(`${SUPABASE_URL}/rest/v1/installations`, {
                method: 'POST',
                headers: {
                    'apikey':        SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type':  'application/json'
                },
                body: JSON.stringify({
                    artist_id:         dbArtistId,
                    installation_code: artistId,
                    seed:              seed
                })
            });
        }

        return dbArtistId;
    } catch (e) {
        console.error('Supabase fetch error:', e.message);
        return null;
    }
}

// ── Lecture de l'app locale ────────────────────────────────────────────────────
function readAppHtml(artistId, profile) {
    // Tente de lire le fichier app/index.html depuis la racine du repo
    const appPath = path.join(__dirname, '..', 'app', 'index.html');
    let html;

    if (fs.existsSync(appPath)) {
        html = fs.readFileSync(appPath, 'utf8');
        console.log('✅ app/index.html lu depuis le disque');
    } else {
        // Fallback minimal si le fichier n'est pas trouvé
        console.warn('⚠️  app/index.html introuvable – utilisation du fallback');
        html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
<title>TCHAK</title></head><body>
<h1>TCHAK</h1>
<p>Bienvenue ${profile.firstName} ${profile.lastName} !</p>
<p>ID : ${artistId}</p>
</body></html>`;
    }

    return html;
}

// ── Handler principal ──────────────────────────────────────────────────────────
exports.handler = async (event) => {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin':  '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        const profile  = JSON.parse(event.body);
        const artistId = `TCHAK-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const seed     = crypto.randomBytes(32).toString('hex');
        const issuedAt = new Date().toISOString();

        // ── Supabase ───────────────────────────────────────────────────────────
        const dbArtistId = await insertArtist(profile, artistId, seed);

        // ── Profils JSON ───────────────────────────────────────────────────────
        const artistProfileJson = JSON.stringify({
            artistId,
            dbArtistId:  dbArtistId || null,
            firstName:   profile.firstName   || '',
            lastName:    profile.lastName    || '',
            pseudonym:   profile.pseudonym   || '',
            name:        `${profile.firstName} ${profile.lastName}`.trim(),
            email:       profile.email       || '',
            phone:       profile.phone       || '',
            whatsapp:    profile.whatsapp    || '',
            techniques:  profile.techniques  || [],
            movements:   profile.movements   || [],
            bio:         profile.bio         || '',
            organization:profile.organization|| '',
            role:        profile.role        || '',
            language:    profile.language    || 'fr',
            usageType:   profile.usageType   || '',
            tier:        'free',
            registeredAt: issuedAt
        }, null, 2);

        const systemConfigJson = JSON.stringify({
            version:          '2.0.0',
            mode:             'free',
            certificateLimit: 10,
            storagePath:      '~/TCHAK',
            appVersion:       'stable',
            issuedAt
        }, null, 2);

        const chainSeedJson = JSON.stringify({
            seed,
            createdAt: issuedAt,
            artistId
        }, null, 2);

        // ── App HTML ───────────────────────────────────────────────────────────
        const appHtml = readAppHtml(artistId, profile);

        // ── Scripts d'installation ─────────────────────────────────────────────
        const installSh = `#!/bin/bash
# ============================================================
# TCHAK Studio – Script d'installation (macOS / Linux)
# Artiste : ${profile.firstName} ${profile.lastName}
# ID      : ${artistId}
# ============================================================
set -e
echo ""
echo "🎨 TCHAK Studio – Installation"
echo "────────────────────────────────"

# Créer les répertoires TCHAK
mkdir -p ~/TCHAK/pdf
mkdir -p ~/TCHAK/certificates
echo "📁 Répertoires créés dans ~/TCHAK/"

# Copier la configuration
cp config/artist_profile.json ~/TCHAK/
cp config/chain_seed.json      ~/TCHAK/
echo "🔐 Configuration copiée"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js non trouvé. Téléchargez-le sur https://nodejs.org"
    exit 1
fi
echo "✅ Node.js détecté : $(node -v)"

echo ""
echo "✅ Installation terminée !"
echo "📂 Données stockées dans : ~/TCHAK"
echo "🚀 Démarrez avec : npx serve app"
echo ""
`;

        const installPs1 = `# ============================================================
# TCHAK – Script d'installation (Windows PowerShell)
# Artiste : ${profile.firstName} ${profile.lastName}
# ID      : ${artistId}
# ============================================================
Write-Host ""
Write-Host "TCHAK – Installation" -ForegroundColor Cyan
Write-Host "----------------------------"

# Créer les répertoires TCHAK
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\TCHAK\\pdf"          | Out-Null
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\TCHAK\\certificates" | Out-Null
Write-Host "Répertoires créés dans $env:USERPROFILE\\TCHAK" -ForegroundColor Green

# Copier la configuration
Copy-Item "config\\artist_profile.json" "$env:USERPROFILE\\TCHAK\\" -Force
Copy-Item "config\\chain_seed.json"     "$env:USERPROFILE\\TCHAK\\" -Force
Write-Host "Configuration copiée" -ForegroundColor Green

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js détecté : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js non trouvé. Téléchargez-le sur https://nodejs.org" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installation terminée !" -ForegroundColor Green
Write-Host "Données stockées dans : $env:USERPROFILE\\TCHAK"
Write-Host "Démarrez avec : npx serve app"
Write-Host ""
`;

        const readme = `# TCHAK – Guide d'installation

**Artiste :** ${profile.firstName} ${profile.lastName}  
**ID unique :** \`${artistId}\`  
**Date de génération :** ${new Date().toLocaleString('fr-FR')}

---

## 🪟 Windows

1. Décompressez ce dossier
2. Ouvrez PowerShell dans le dossier décompressé
3. Exécutez :
   \`\`\`powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\\install.ps1
   \`\`\`
4. Démarrez l'application :
   \`\`\`powershell
   npx serve app
   \`\`\`
5. Ouvrez votre navigateur sur **http://localhost:3000**

---

## 🍎 macOS / 🐧 Linux

1. Décompressez ce dossier
2. Ouvrez un terminal dans le dossier
3. Exécutez :
   \`\`\`bash
   chmod +x install.sh && ./install.sh
   \`\`\`
4. Démarrez l'application :
   \`\`\`bash
   npx serve app
   \`\`\`
5. Ouvrez votre navigateur sur **http://localhost:3000**

---

## ℹ️ Informations

- **Fonctionnement :** 100% hors-ligne, aucune connexion internet requise
- **Données :** Stockées dans \`~/TCHAK/\` (jamais envoyées à un serveur)
- **Certificats :** Chaîne SHA256 locale, 10/mois en version gratuite
- **Support :** sieni7@gmail.com

---

*TCHAK – Certification d'authenticité pour les artistes*  
*Créé avec ❤️ pour les artistes de Côte d'Ivoire 🇨🇮*
`;

        // ── Assemblage ZIP ─────────────────────────────────────────────────────
        const zip = new JSZip();

        zip.file('app/index.html',             appHtml);
        zip.file('config/artist_profile.json', artistProfileJson);
        zip.file('config/system_config.json',  systemConfigJson);
        zip.file('config/chain_seed.json',     chainSeedJson);
        zip.file('install.sh',                 installSh);
        zip.file('install.ps1',                installPs1);
        zip.file('README_INSTALL.md',          readme);

        const content = await zip.generateAsync({
            type:               'base64',
            compression:        'DEFLATE',
            compressionOptions: { level: 6 }
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type':                'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                zip:      content,
                artistId,
                dbSaved:  !!dbArtistId
            })
        };

    } catch (error) {
        console.error('generate-zip error:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
};
