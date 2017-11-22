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

    trayIcon.on('click', (event, bounds) => {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = mainWindow.getBounds();

        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                width,
                height
            });
            mainWindow.show();
        }

    });
});