import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import fs from 'fs';
const __dirname = import.meta.dirname;

const USER_DATA_PATH = path.join(app.getPath("userData"), 'user_data.json');

//Read from data store
function handleLoadStore() {
  try{
    if(fs.existsSync(USER_DATA_PATH)){
      const data = fs.readFileSync(USER_DATA_PATH, 'utf-8');
      return (JSON.parse(data)).theme;
    }
    else{
      console.log("no file found");
      //Dark theme is the default if no saved data is present
      return 'dark';
    }
  }
  catch (error){
    console.log("Error retrieving user data", error);
    return null;
  }
}

//Write to data store
async function handleWriteStore(event, theme) {
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify({theme: theme}));
}

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      additionalArguments: [`--savedTheme=${handleLoadStore()}`],
      preload: path.join(__dirname, './preload.cjs')
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
  ipcMain.on('saveTheme', handleWriteStore);
  createWindow();
});