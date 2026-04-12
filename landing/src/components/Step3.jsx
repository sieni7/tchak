import React from 'react';

export default function Step3({ data, update, next, prev }) {
  const types = ['Peinture', 'Photographie', 'Sculpture', 'Dessin'];
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h3 className="text-2xl font-bold">Nature de vos œuvres</h3>
      <div className="grid grid-cols-2 gap-4">
        {types.map(t => (
          <button 
            key={t}
            onClick={() => update({...data, artType: t})}
            className={`p-4 rounded-xl border font-semibold transition-all ${data.artType === t ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        <button onClick={prev} className="flex-1 py-4 bg-slate-700 rounded-xl font-bold">Retour</button>
        <button onClick={next} className="flex-1 py-4 bg-indigo-600 rounded-xl font-bold">Continuer</button>
      </div>
    </div>
  );
}
