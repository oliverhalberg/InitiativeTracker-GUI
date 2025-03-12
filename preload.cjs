const { contextBridge, ipcRenderer } = require('electron');

const savedArg = process.argv.filter(p => p.indexOf("--savedTheme=") >= 0)[0];
const savedArgValue = savedArg.substr(savedArg.indexOf("=") + 1);

contextBridge.exposeInMainWorld('dataStoreAPI', {
    saveTheme: (theme) => ipcRenderer.send('saveTheme', theme),
    savedTheme: () => savedArgValue
});

