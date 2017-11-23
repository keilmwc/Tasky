const electron = require('electron');
const { app, ipcMain } = electron;
const path = require('path');
const TimerTray = require('./app/timer-tray.js');
const MainWindow = require('./app/main-window.js');

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new MainWindow({
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: { backgroundThrottling: false }
    });

    // Leave here so we can load different URL's
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    // New tray icon
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});
