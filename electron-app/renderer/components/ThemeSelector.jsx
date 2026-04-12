import React from 'react';

export default function ThemeSelector({ selected, onSelect }) {
  const themes = [
    { id: 'classic', name: 'Classique', desc: 'Sérif, élégant et traditionnel' },
    { id: 'modern', name: 'Moderne', desc: 'Sans-sérif, épuré et tech' }
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <h3 className="text-xl font-bold">Choisissez un thème</h3>
      <div className="grid grid-cols-2 gap-4">
        {themes.map(t => (
          <button 
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${selected === t.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/50'}`}
          >
            <p className="font-bold text-lg">{t.name}</p>
            <p className="text-sm text-slate-500">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
