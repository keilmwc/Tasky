const electron = require('electron');
const { app, BrowserWindow} = electron;
const path =require('path');
const TimerTray = require('./app/timer-tray.js');

let mainWindow;

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
    new TimerTray(iconPath, mainWindow);
});