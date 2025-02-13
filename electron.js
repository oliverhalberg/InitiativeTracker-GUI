import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import path from 'node:path';
const __dirname = import.meta.dirname;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    resizable: true,
    minWidth: 800,
    minHeight: 600
  });

  win.webContents.send('test', "hi");


  if (isDev){
    win.loadURL('http://localhost:5173');
  }
  else {
    win.loadFile("dist/index.html");
  }

}

app.whenReady().then(() => {
  createWindow();
});