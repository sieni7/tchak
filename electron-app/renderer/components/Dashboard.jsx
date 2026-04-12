import React from 'react';

export default function Dashboard({ stats, onNew }) {
  const percent = (stats.count / stats.limit) * 100;

  const handleExportData = async () => {
    const res = await window.electronAPI.exportAllData();
    if (res.success) alert(`Données exportées : ${res.path}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">Tableau de Bord</h2>
          <p className="text-slate-400">Version 1.0.0 • <span className="text-indigo-400">À jour</span></p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-all"
          >
            Exporter les données (ZIP)
          </button>
          <button 
            onClick={() => window.open('https://tchak.art/downloads')}
            className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-sm font-bold hover:bg-indigo-600/30"
          >
            Vérifier les MAJ
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5 shadow-inner">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Quota Mensuel</p>
          <div className="flex items-end space-x-2">
            <span className="text-5xl font-black text-white">{stats.count}</span>
            <span className="text-slate-500 text-xl font-medium mb-1">/ {stats.limit}</span>
          </div>
          <div className="mt-6 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${percent > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="md:col-span-2 bg-indigo-600/10 p-8 rounded-3xl border border-indigo-500/20 flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-300">Nouveau certificat ?</h3>
            <p className="text-slate-400 max-w-sm">Choisissez votre thème et certifiez une œuvre en quelques secondes.</p>
          </div>
          <button 
            onClick={onNew}
            disabled={stats.count >= stats.limit}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
          >
            Commencer
          </button>
        </div>
      </div>

      <section className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-xl font-bold mb-4">Statut Système</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Chaîne SHA256</span>
            <span className="text-emerald-400 font-mono">ACTIVE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Mode</span>
            <span className="text-slate-300">100% Hors-ligne</span>
          </div>
        </div>
      </section>
    </div>
  );
}
