const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const createWindow = () => {
    const win = new BrowserWindow({
        height: 500,
        width: 800,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }
    });

    // win.loadFile('index.html');
    win.loadURL('http://localhost:3000')
    // win.loadURL('../index.html')
    // win.loadFile('./public/index.html')

    // win.webContents.openDevTools();

    // win.on('close', function(){
    //     win = null;
    // })

};

app.on('ready', createWindow);

app.on("window-all-closed", function(){
    app.quit();
})

app.on('activate', function(){
    if(win == null){
        createWindow();
    }
})