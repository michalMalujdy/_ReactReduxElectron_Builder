const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
    console.log(__dirname);
    mainWindow = new BrowserWindow(
        { 
            width: 1920,
            height: 1080,
            icon: __dirname + '/favicon.ico',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        }
    );
    
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
app.whenReady().then(() => {
    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
});