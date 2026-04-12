import React from 'react';

export default function Step2({ data, update, next, prev }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h3 className="text-2xl font-bold">Votre contact</h3>
      <input 
        type="email" 
        value={data.email}
        onChange={e => update({...data, email: e.target.value})}
        className="w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500"
        placeholder="artiste@example.com"
      />
      <div className="flex space-x-4">
        <button onClick={prev} className="flex-1 py-4 bg-slate-700 rounded-xl font-bold">Retour</button>
        <button onClick={next} disabled={!data.email} className="flex-1 py-4 bg-indigo-600 rounded-xl font-bold disabled:opacity-50">Continuer</button>
      </div>
    </div>
  );
}
