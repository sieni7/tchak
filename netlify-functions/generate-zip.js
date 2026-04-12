const JSZip = require('jszip');

/**
 * Netlify Function: generate-zip
 * Version réelle pour le Sprint 2
 * Crée un ZIP contenant l'installeur (mock) et la configuration injectée.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const zip = new JSZip();

    // 1. Injection de la configuration artiste
    const artistConfig = {
      artistName: data.name,
      email: data.email,
      artType: data.artType,
      signature: data.signature,
      generatedAt: new Date().toISOString()
    };
    zip.file("config/artist.json", JSON.stringify(artistConfig, null, 2));

    // 2. Injection de la graine de confiance (SHA256 Seed)
    const crypto = require('crypto');
    const seed = {
      initialSeed: crypto.randomBytes(32).toString('hex'),
      environment: "production"
    };
    zip.file("config/chain_seed.json", JSON.stringify(seed, null, 2));

    // 3. Inclusion de l'installeur (Mock pour le Sprint 2)
    // En production, ce buffer proviendrait du stockage local des builds
    zip.file("TCHAK-FREE-Setup-Mock.exe", "Mock Binary Content - Run 'npm run dist' to build real installer.");

    // 4. Script d'installation / README rapide
    zip.file("LISEZ-MOI.txt", `Bienvenue ${data.name} !\n\nInstallez TCHAK-FREE-Setup-Mock.exe pour commencer à certifier vos œuvres hors-ligne.`);

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="TCHAK-FREE-${data.name}.zip"`
      },
      body: zipBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
