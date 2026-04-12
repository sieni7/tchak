const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getStats: () => ipcRenderer.invoke('get-stats'),
  generateId: () => ipcRenderer.invoke('generate-id'),
  saveCertificate: (cert) => ipcRenderer.invoke('save-certificate', cert),
  exportPDF: (payload) => ipcRenderer.invoke('export-pdf', payload),
  exportAllData: () => ipcRenderer.invoke('export-all-data'),
  shareCertificate: (path) => ipcRenderer.invoke('share-certificate', path)
});
