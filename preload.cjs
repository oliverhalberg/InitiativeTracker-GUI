const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dataStoreAPI', {
    saveTheme: (theme) => ipcRenderer.send('saveTheme', theme),
    loadTheme: () => ipcRenderer.invoke('loadTheme')
});

