const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    savePDF: (options) => ipcRenderer.invoke('save-pdf', options),
    chainGet: () => ipcRenderer.invoke('chain-get'),
    chainUpdate: (data) => ipcRenderer.invoke('chain-update', data),
    quotaCheck: () => ipcRenderer.invoke('quota-check'),
    openDataFolder: () => ipcRenderer.invoke('open-data-folder'),
    certsLoad: () => ipcRenderer.invoke('certs-load'),
    isElectron: true
});
