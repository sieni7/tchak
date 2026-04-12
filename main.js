const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "TCHAK ! - Certificat d'authenticité",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');

    // Activer les outils de développement pour le débug
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// --- GESTIONNAIRES IPC ---

// 1. Sauvegarde PDF
ipcMain.handle('save-pdf', async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const { filePath } = await dialog.showSaveDialog(win, {
        title: 'Enregistrer le certificat PDF',
        defaultPath: path.join(app.getPath('documents'), options.defaultName),
        filters: [{ name: 'Fichiers PDF', extensions: ['pdf'] }]
    });

    if (!filePath) return { success: false, cancelled: true };

    try {
        const data = await win.webContents.printToPDF({
            marginsType: 0,
            printBackground: true,
            pageSize: 'A4',
            landscape: false
        });
        fs.writeFileSync(filePath, data);
        return { success: true, path: filePath };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 2. Gestion de la chaîne SHA256
ipcMain.handle('chain-get', () => {
    const chainPath = path.join(app.getPath('userData'), 'chain.json');
    if (fs.existsSync(chainPath)) {
        return JSON.parse(fs.readFileSync(chainPath, 'utf8'));
    }
    // Initialisation
    const seed = crypto.randomBytes(32).toString('hex');
    const chain = { 
        seed, 
        lastId: seed, // Le premier certificat sera lié à la seed
        history: [], 
        createdAt: new Date().toISOString() 
    };
    fs.writeFileSync(chainPath, JSON.stringify(chain, null, 2));
    return chain;
});

ipcMain.handle('chain-update', (event, { newId, certificate }) => {
    const chainPath = path.join(app.getPath('userData'), 'chain.json');
    const certsPath = path.join(app.getPath('userData'), 'certificates.json');
    
    // Mise à jour de la chaîne
    const chain = JSON.parse(fs.readFileSync(chainPath, 'utf8'));
    chain.lastId = newId;
    chain.history.push(newId);
    fs.writeFileSync(chainPath, JSON.stringify(chain, null, 2));

    // Sauvegarde du certificat sur disque
    let certs = [];
    if (fs.existsSync(certsPath)) {
        certs = JSON.parse(fs.readFileSync(certsPath, 'utf8'));
    }
    certs.push(certificate);
    fs.writeFileSync(certsPath, JSON.stringify(certs, null, 2));

    return chain;
});

// 3. Vérification des Quotas (10/mois)
ipcMain.handle('quota-check', () => {
    const certsPath = path.join(app.getPath('userData'), 'certificates.json');
    if (!fs.existsSync(certsPath)) return { remaining: 10, count: 0 };
    
    const certs = JSON.parse(fs.readFileSync(certsPath, 'utf8'));
    const now = new Date();
    const currentMonthCerts = certs.filter(c => {
        const d = new Date(c.timestamp);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    
    const count = currentMonthCerts.length;
    return { remaining: Math.max(0, 10 - count), count };
});

// 4. Utilitaires
ipcMain.handle('open-data-folder', () => {
    shell.openPath(app.getPath('userData'));
});

// 5. Récupération initiale des certificats
ipcMain.handle('certs-load', () => {
    const certsPath = path.join(app.getPath('userData'), 'certificates.json');
    if (fs.existsSync(certsPath)) {
        return JSON.parse(fs.readFileSync(certsPath, 'utf8'));
    }
    return [];
});
