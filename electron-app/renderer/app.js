import Form from './components/Form';
import Dashboard from './components/Dashboard';
import PreviewA4 from './components/PreviewA4';
import ThemeSelector from './components/ThemeSelector';

const App = () => {
  const [view, setView] = useState('dashboard');
  const [stats, setStats] = useState({ count: 0, limit: 10 });
  const [currentCert, setCurrentCert] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('classic');

  useEffect(() => {
    refreshStats();
  }, []);

  const refreshStats = async () => {
    const s = await window.electronAPI.getStats();
    setStats(s);
  };

  const handleStartNew = () => {
    if (stats.count >= stats.limit) {
      alert('Quota mensuel atteint (10/mois).');
      return;
    }
    setView('form');
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col pt-12">
        <h1 className="text-2xl font-black text-indigo-400 mb-12 tracking-tighter">TCHAK FREE</h1>
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${view === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'hover:bg-slate-800'}`}
          >
            Tableau de Bord
          </button>
          <button 
            onClick={handleStartNew}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${view === 'form' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'hover:bg-slate-800'}`}
          >
            Nouveau Certificat
          </button>
        </nav>
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          Version 0.1.0 • Offline Ready
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900 pt-12 px-10 pb-20">
        {view === 'dashboard' && <Dashboard stats={stats} onNew={handleStartNew} />}
        {view === 'form' && <Form onComplete={(cert) => { setCurrentCert(cert); setView('themes'); }} />}
        {view === 'themes' && (
          <div className="max-w-xl mx-auto space-y-8">
            <ThemeSelector selected={selectedTheme} onSelect={setSelectedTheme} />
            <button 
              onClick={() => setView('preview')}
              className="w-full py-4 bg-indigo-600 rounded-xl font-bold"
            >
              Voir la prévisualisation
            </button>
          </div>
        )}
        {view === 'preview' && <PreviewA4 certificate={currentCert} theme={selectedTheme} onDone={() => { refreshStats(); setView('dashboard'); }} />}
      </main>
    </div>
  );
};

export default App;
