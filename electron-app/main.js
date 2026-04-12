const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const JSZip = require('jszip');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0f172a'
  });

  // Pour le dev, on charge localhost ou file://
  const startUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, 'renderer/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Initialisation des données
const dataPath = path.join(app.getPath('userData'), 'data');
if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

const chainPath = path.join(dataPath, 'chain.json');
if (!fs.existsSync(chainPath)) {
  const seed = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(chainPath, JSON.stringify({
    seed: seed,
    lastId: seed,
    history: []
  }, null, 2));
}

// IPC Handlers
ipcMain.handle('get-stats', () => {
  const certificatesPath = path.join(dataPath, 'certificates.json');
  if (!fs.existsSync(certificatesPath)) return { count: 0, limit: 10 };
  
  const data = JSON.parse(fs.readFileSync(certificatesPath));
  const now = new Date();
  const currentMonthCount = data.certificates.filter(c => {
    const d = new Date(c.timestamp);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  
  return { count: currentMonthCount, limit: 10 };
});

ipcMain.handle('generate-id', () => {
  const chain = JSON.parse(fs.readFileSync(chainPath));
  const timestamp = new Date().toISOString();
  const nextId = crypto.createHash('sha256')
    .update(chain.lastId + timestamp)
    .digest('hex');
  
  return { id: nextId, timestamp };
});

ipcMain.handle('save-certificate', (event, cert) => {
  const certPath = path.join(dataPath, 'certificates.json');
  let data = { certificates: [] };
  if (fs.existsSync(certPath)) data = JSON.parse(fs.readFileSync(certPath));
  
  data.certificates.push(cert);
  fs.writeFileSync(certPath, JSON.stringify(data, null, 2));
  
  // Update Chain
  const chain = JSON.parse(fs.readFileSync(chainPath));
  chain.lastId = cert.id;
  chain.history.push(cert.id);
  fs.writeFileSync(chainPath, JSON.stringify(chain, null, 2));
  
  return { success: true };
});

ipcMain.handle('export-pdf', async (event, { htmlContent, theme }) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const pdfPath = path.join(app.getPath('documents'), `TCHAK-Cert-${Date.now()}.pdf`);
  
  // Note: En production, on injecterait classic.css ou modern.css dans htmlContent ici
  
  const options = {
    marginsType: 0,
    pageSize: 'A4',
    printBackground: true,
    landscape: false
  };

  try {
    const data = await win.webContents.printToPDF(options);
    fs.writeFileSync(pdfPath, data);
    shell.openPath(pdfPath);
    return { success: true, path: pdfPath };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-all-data', async () => {
  const zip = new JSZip();
  const userDataPath = path.join(app.getPath('userData'), 'data');
  
  if (fs.existsSync(userDataPath)) {
    const files = fs.readdirSync(userDataPath);
    files.forEach(file => {
      const content = fs.readFileSync(path.join(userDataPath, file));
      zip.file(file, content);
    });
  }
  
  const exportPath = path.join(app.getPath('documents'), `TCHAK-Data-Backup-${Date.now()}.zip`);
  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(exportPath, buffer);
  shell.showItemInFolder(exportPath);
  
  return { success: true, path: exportPath };
});

ipcMain.handle('share-certificate', async (event, filePath) => {
  if (fs.existsSync(filePath)) {
    shell.showItemInFolder(filePath);
    return { success: true };
  }
  return { success: false, error: 'File not found' };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
