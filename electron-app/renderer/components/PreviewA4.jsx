import React from 'react';

export default function PreviewA4({ certificate, theme, onDone }) {
  const handleExport = async () => {
    const res = await window.electronAPI.exportPDF({ htmlContent: '', theme });
    if (res.success) {
      alert(`Certificat exporté avec succès dans vos documents !`);
      onDone();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-500">
      <header className="w-full flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black">Prévisualisation</h2>
          <p className="text-slate-500">Vérifiez les données avant l'export PDF final.</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={onDone} className="px-6 py-3 bg-slate-800 rounded-xl font-bold">Annuler</button>
          <button onClick={handleExport} className="px-6 py-3 bg-indigo-600 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Exporter en PDF</button>
        </div>
      </header>

      {/* A4 Sheet Container */}
      <div id="cert-sheet" className="bg-white text-slate-900 w-[793px] h-[1122px] shadow-2xl p-20 flex flex-col relative overflow-hidden border">
        {/* Border decorative */}
        <div className="absolute inset-4 border-[12px] border-slate-900/5 pointer-events-none" />
        
        <div className="text-center space-y-8 relative z-10 pt-10">
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-20 italic">CERTIFICAT D'AUTHENTICITÉ</h1>
          
          <div className="w-40 h-1 bg-slate-900 mx-auto mb-16" />

          <section className="space-y-12 text-left px-10">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Titre de l'œuvre</p>
              <p className="text-4xl font-serif italic font-medium">{certificate.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Artiste</p>
                <p className="text-2xl font-bold">{certificate.artist}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Année</p>
                <p className="text-2xl font-bold">{certificate.year}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Médium</p>
                <p className="text-2xl font-bold">{certificate.medium}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dimensions</p>
                <p className="text-2xl font-bold">{certificate.dimensions}</p>
              </div>
            </div>
          </section>

          <div className="flex justify-between items-end px-10 pt-20">
            <div className="space-y-4 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signature Certifiée</p>
              <div className="h-24 w-60 border-b-2 border-slate-900 flex items-center justify-center italic text-slate-300">
                [Signature Canvas Injectée]
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <div className="w-32 h-32 bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400">
                [QR ID]
              </div>
              <p className="text-[10px] font-mono text-slate-400 max-w-40 leading-tight">
                ID : {certificate.id.substring(0, 16)}...
              </p>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-16 left-20 right-20 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          <span>TCHAK ! FREE VERSION V0.1 • Thème : {theme}</span>
          <span>SÉCURISÉ PAR CHAÎNE SHA256 DÉTERMINISTE</span>
        </footer>
      </div>
    </div>
  );
}
