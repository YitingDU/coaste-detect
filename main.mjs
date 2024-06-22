import isDev from 'electron-is-dev';
import { app, BrowserWindow } from 'electron'
if (isDev) {
    console.log('Running in development');
} else {
    console.log('Running in production');
}
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height:680,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    const urlLocation = isDev? 'http://localhost:3000' : 'dummyURL'
    mainWindow.loadURL(urlLocation)
})