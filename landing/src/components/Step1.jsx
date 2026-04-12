import React from 'react';

export default function Step1({ data, update, next }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold">Bienvenue ! Comment vous appelez-vous ?</h3>
      <input 
        type="text" 
        value={data.name}
        onChange={e => update({...data, name: e.target.value})}
        className="w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500"
        placeholder="Prénom Nom"
      />
      <button 
        onClick={next}
        disabled={!data.name}
        className="w-full py-4 bg-indigo-600 rounded-xl font-bold disabled:opacity-50"
      >
        Continuer
      </button>
    </div>
  );
}
