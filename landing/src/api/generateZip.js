/**
 * API Mock for ZIP generation
 * In production, this calls a Netlify Function or a specialized backend.
 */
export const fetchGenerateZip = async (userData) => {
  console.log('Generating ZIP for:', userData.name);
  
  // Simulation d'un délai de génération
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Simulacre d'appel à la Netlify Function
  // const response = await fetch('/.netlify/functions/generate-zip', {
  //   method: 'POST',
  //   body: JSON.stringify(userData)
  // });
  // return await response.blob();

  // Pour le Sprint 1, on retourne un Blob vide (ou un fichier texte factice)
  const dummyContent = `TCHAK FREE CONFIG\nArtist: ${userData.name}\nSeed: ${Math.random().toString(36).substring(7)}`;
  return new Blob([dummyContent], { type: 'application/zip' });
};
