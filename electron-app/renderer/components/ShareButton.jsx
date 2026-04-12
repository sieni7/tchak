import React from 'react';

export default function ShareButton({ filePath }) {
  const handleShare = async () => {
    if (!filePath) {
      alert("Aucun fichier à partager.");
      return;
    }
    const res = await window.electronAPI.shareCertificate(filePath);
    if (!res.success) alert("Erreur lors du partage : " + res.error);
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-sm font-bold border border-slate-700 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" />
      </svg>
      <span>Partager</span>
    </button>
  );
}
