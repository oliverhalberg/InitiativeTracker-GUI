import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import fs from 'fs';
const __dirname = import.meta.dirname;

const USER_DATA_PATH = path.join(app.getPath("userData"), 'user_data.json');

//write to data store
async function handleLoadStore() {
  try{
    if(fs.existsSync(USER_DATA_PATH)){
      const data = fs.readFileSync(USER_DATA_PATH, 'utf-8');
      console.log("loaded data: ");
      console.log(JSON.parse(data));
      return (JSON.parse(data)).theme;
    }
    else{
      console.log("no file found");
      //dark theme is the default
      return 'dark';
    }
  }
  catch (error){
    console.log("Error retrieving user data", error);
    return null;
  }
}
//read from data store
async function handleWriteStore(event, theme) {
  console.log("writing " + theme);
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify({theme: theme}));
}

let win;

function createWindow() {
  win = new BrowserWindow({
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

  if (isDev){
    win.loadURL('http://localhost:5173');
  }
  else {
    win.loadFile("dist/index.html");
  }
}

app.whenReady().then(() => {
  ipcMain.handle('loadTheme', handleLoadStore);
  ipcMain.on('saveTheme', handleWriteStore);
  createWindow();
});