const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const path =require('path');

let mainWindow;
let trayIcon;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    // New tray icon
    trayIcon = new Tray(iconPath);

    trayIcon.on('click', () => {
        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else{
            mainWindow.show();
        }

    });
});