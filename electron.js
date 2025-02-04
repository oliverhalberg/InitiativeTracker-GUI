import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: true,
    minWidth: 800,
    minHeight: 600
  });

  if (isDev){
    win.loadURL('http://localhost:5173');
  }
  else {
    win.loadFile("dist/index.html");
  }

}

app.whenReady().then(createWindow);