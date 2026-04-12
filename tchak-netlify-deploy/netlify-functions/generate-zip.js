const JSZip = require('jszip');
const crypto = require('crypto');

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const artistId = `TCHAK-ART-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        
        const zip = new JSZip();
        
        // Create the app directory with a simple index.html
        zip.file("app/index.html", `<!DOCTYPE html>
<html>
<head><title>TCHAK Studio</title><meta charset="UTF-8"></head>
<body>
    <h1>TCHAK Studio</h1>
    <p>Bienvenue ${body.firstName} ${body.lastName}!</p>
    <p>Votre ID unique: ${artistId}</p>
    <p>L'application complète sera disponible dans la prochaine version.</p>
</body>
</html>`);
        
        // Configuration files
        zip.file("config/artist_profile.json", JSON.stringify({
            artistId: artistId,
            firstName: body.firstName,
            lastName: body.lastName,
            pseudonym: body.pseudonym || "",
            email: body.email,
            phone: body.phone,
            whatsapp: body.whatsapp || "",
            techniques: body.techniques || [],
            movements: body.movements || [],
            bio: body.bio || "",
            organization: body.organization || "",
            role: body.role || "",
            language: body.language || "fr",
            usageType: body.usageType || "",
            registeredAt: new Date().toISOString()
        }, null, 2));
        
        zip.file("config/system_config.json", JSON.stringify({
            version: "1.0.0",
            mode: "free",
            certificateLimit: 10,
            storagePath: "~/TCHAK"
        }, null, 2));
        
        const seed = crypto.randomBytes(32).toString('hex');
        zip.file("config/chain_seed.json", JSON.stringify({
            seed: seed,
            createdAt: new Date().toISOString()
        }, null, 2));
        
        // Installation scripts
        zip.file("install.sh", `#!/bin/bash
echo "🚀 Installation de TCHAK Studio..."
mkdir -p ~/TCHAK/pdf
mkdir -p ~/TCHAK/certificates
cp config/artist_profile.json ~/TCHAK/
cp config/chain_seed.json ~/TCHAK/
echo "✅ Installation terminée!"
echo "📁 Données stockées dans: ~/TCHAK"
echo "🌐 Lancez 'npx serve app' pour démarrer TCHAK Studio"
`);
        
        zip.file("install.ps1", `Write-Host "🚀 Installation de TCHAK Studio..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\TCHAK\\pdf" | Out-Null
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\\TCHAK\\certificates" | Out-Null
Copy-Item "config\\artist_profile.json" "$env:USERPROFILE\\TCHAK\\" -Force
Copy-Item "config\\chain_seed.json" "$env:USERPROFILE\\TCHAK\\" -Force
Write-Host "✅ Installation terminée!" -ForegroundColor Green
Write-Host "📁 Données stockées dans: $env:USERPROFILE\\TCHAK"
Write-Host "🌐 Lancez 'npx serve app' pour démarrer TCHAK Studio"
`);
        
        zip.file("README_INSTALL.md", `# Installation de TCHAK Studio

## Windows
1. Décompressez ce dossier
2. Exécutez \`install.ps1\` (clic droit → Exécuter avec PowerShell)
3. Installez Node.js si nécessaire
4. Lancez \`npx serve app\`

## macOS/Linux
1. Décompressez ce dossier
2. Exécutez \`chmod +x install.sh && ./install.sh\`
3. Lancez \`npx serve app\`

Votre identifiant unique: ${artistId}
        `);
        
        const content = await zip.generateAsync({ type: "base64" });
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ zip: content, artistId: artistId })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
