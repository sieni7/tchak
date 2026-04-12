import React, { useState } from 'react';
import Onboarding from './Onboarding';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500/30">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-indigo-500/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          TCHAK !
        </h1>
        <div className="space-x-8 text-slate-400 text-sm tracking-wide">
          <a href="#concept" className="hover:text-white transition-colors">Concept</a>
          <a href="#pro" className="hover:text-white transition-colors">TCHAK PRO</a>
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20">
            Obtenir TCHAK FREE
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <header className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight">
            Certifiez vos œuvres <br/>
            <span className="text-indigo-400">100% hors-ligne.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Un outil gratuit pour les artistes. Générez vos certificats d'authenticité de manière sécurisée et déterministe.
          </p>
        </header>

        <section className="bg-slate-800/50 p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
          <Onboarding />
        </section>
      </main>

      <footer className="py-20 text-center text-slate-500 text-sm border-t border-slate-800 mt-20">
        <p>© 2026 TCHAK ! — Fait avec passion pour les créateurs.</p>
      </footer>
    </div>
  );
}

export default App;
