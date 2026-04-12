// Netlify Function: generate-zip.js
// Purpose: Collect artist data, generate a unique profile, and return a customized Studio ZIP.

const fs = require('fs');
const path = require('path');
// Note: In a real deploy, you would add "adm-zip" to your package.json
// const AdmZip = require('adm-zip'); 

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, email, style } = data;

        // 1. Simulation de la création en base Supabase (normalement via client supabase)
        const artistId = "art_" + Math.random().toString(36).substr(2, 9);
        const installationCode = `TCHAK-ART-2026-${Math.random().toString().substr(2, 4)}`;
        const seed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // 2. Préparation du contenu du ZIP
        // Dans cet environnement builder, nous décrivons la logique.
        // Un ZIP contiendrait :
        // - index.html (le prototype)
        // - artist_profile.json
        // - start.bat
        
        const artistProfile = {
            artistId,
            installationCode,
            name,
            email,
            style,
            seed,
            tier: "FREE",
            createdAt: new Date().toISOString()
        };

        // Note: La génération réelle de ZIP nécessite une bibliothèque comme 'adm-zip' ou 'archiver'.
        // Pour ce livrable, nous retournons les métadonnées et simulons le succès.
        
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "ZIP Generation Initiated",
                profile: artistProfile,
                downloadUrl: "#", // Dans un vrai cas, on retournerait un flux binaire ou un lien S3
                instructions: "Votre Studio TCHAK est prêt. Décompressez le fichier et lancez 'start.bat'."
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate package: " + error.message })
        };
    }
};
