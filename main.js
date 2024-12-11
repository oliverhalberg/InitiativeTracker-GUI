const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile('src/index.html');
}

app.whenReady().then( () => {
    createWindow();

    //macOS: If the app is activated when no windows are available, create a new window
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
})

//Windows and Linux: Quit app when all windows closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});