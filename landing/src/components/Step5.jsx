import React from 'react';

export default function Step5({ data, onComplete, prev, isGenerating }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
      <div className="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-3xl font-bold">Prêt à TCHAKÉ ?</h3>
      <p className="text-slate-400">
        Nous avons préparé votre configuration personnalisée. Cliquez ci-dessous pour télécharger votre application Electron exclusive.
      </p>
      
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-500/10 text-left space-y-2">
        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Récapitulatif</p>
        <p><span className="text-slate-500">Artiste :</span> {data.name}</p>
        <p><span className="text-slate-500">Spécialité :</span> {data.artType}</p>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <img src={data.signature} alt="Signature" className="h-12 opacity-80" />
        </div>
      </div>

      <div className="flex space-x-4 pt-6">
        <button onClick={prev} disabled={isGenerating} className="flex-1 py-4 bg-slate-700 rounded-xl font-bold">Retour</button>
        <button 
          onClick={onComplete} 
          disabled={isGenerating}
          className="flex-1 py-4 bg-indigo-600 rounded-xl font-bold relative overflow-hidden group shadow-xl shadow-indigo-500/30"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération...
            </span>
          ) : 'Télécharger TCHAK FREE'}
        </button>
      </div>
    </div>
  );
}
