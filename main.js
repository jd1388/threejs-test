const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

app.on('ready', () => {
    mainWindow= new BrowserWindow({
        frame: false,
        height: 1080,
        width: 1920
    });

    mainWindow.loadURL('http://localhost:8080/');
})
