import React, { useState } from 'react';

export default function Form({ onComplete }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    medium: 'Huile sur toile',
    dimensions: '',
    year: new Date().getFullYear().toString()
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Génération de l'ID via le Main Process
    const { id, timestamp } = await window.electronAPI.generateId();
    const cert = { ...formData, id, timestamp };
    
    // Sauvegarde locale
    await window.electronAPI.saveCertificate(cert);
    
    onComplete(cert);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <header>
        <h2 className="text-3xl font-black">Nouveau Certificat</h2>
        <p className="text-slate-500">Saisissez les informations de l'œuvre à certifier.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Titre de l'œuvre</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} 
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="L'Aube de Grand-Bassam" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Artiste</label>
            <input required type="text" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Année</label>
            <input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Médium</label>
          <input required type="text" value={formData.medium} onChange={e => setFormData({...formData, medium: e.target.value})} 
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Dimensions</label>
          <input required type="text" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} 
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="100 x 80 cm" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20">
          {loading ? 'Génération...' : 'Valider et Voir la Prévisualisation'}
        </button>
      </form>
    </div>
  );
}
