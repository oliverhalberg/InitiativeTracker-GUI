const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('test', {
    onTestMessage: (callback) => ipcRenderer.on('test', (_event, value) => callback(value)),
    message: "hi"
})
