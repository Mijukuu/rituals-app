// Electron Setup
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Save Setup
const fs = require("fs");
const os = require("os");

// Start 
const dataPath = path.join(app.getPath("userData"), "rituals.json");

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        backgroundColor: '#0d0d0f', // black
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    win.loadFile('./renderer/index.html');
}

// Save tasks (Hybrid Saving model)
ipcMain.on("save-tasks", (event, tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
});

// Load tasks 
ipcMain.handle("load-tasks", async() => {
    if (!fs.existsSync(dataPath)) {
        return [];
    }

    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) 
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'dawin')
        app.quit();
})