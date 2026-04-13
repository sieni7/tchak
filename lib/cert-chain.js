/**
 * TCHAK - Moteur cryptographique SHA256 unifié
 * Garantit la cohérence du chaînage entre toutes les instances de l'application
 */

async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Génère le hash unique d'un certificat d'authenticité TCHAK
 * Cette fonction est la source de vérité pour le chaînage cryptographique
 */
async function generateCertificateId(prevId, artist, title, timestamp, signatureDataURL) {
    // Normalisation de la signature (fixe à 64 caractères pour cohérence absolue)
    const signaturePrefix = signatureDataURL.substring(0, 64); 
    const rawData = `${prevId}|${artist}|${title}|${timestamp}|${signaturePrefix}`;
    return await sha256(rawData);
}

// Support pour environnement de test si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCertificateId, sha256 };
}
