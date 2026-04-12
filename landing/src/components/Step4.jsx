import React, { useRef, useEffect } from 'react';

export default function Step4({ data, update, next, prev }) {
  const canvasRef = useRef(null);

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    update({...data, signature: null});
  };

  const save = () => {
    const png = canvasRef.current.toDataURL();
    update({...data, signature: png});
    next();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    let drawing = false;

    const start = (e) => { drawing = true; draw(e); };
    const end = () => { drawing = false; ctx.beginPath(); };
    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', end);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      window.removeEventListener('mouseup', end);
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h3 className="text-2xl font-bold">Signez ici pour vos certificats</h3>
      <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl overflow-hidden">
        <canvas ref={canvasRef} width={600} height={200} className="w-full h-48 cursor-crosshair" />
      </div>
      <div className="flex space-x-4">
        <button onClick={prev} className="flex-1 py-4 bg-slate-700 rounded-xl font-bold">Retour</button>
        <button onClick={clear} className="flex-1 py-4 bg-slate-800 rounded-xl font-bold">Effacer</button>
        <button onClick={save} className="flex-1 py-4 bg-indigo-600 rounded-xl font-bold">Enregistrer</button>
      </div>
    </div>
  );
}
