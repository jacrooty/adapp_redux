const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Use electron-reload to improved development process
require('electron-reload')(__dirname)

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

console.log('executing main.js')

function createWindow () {
  // Create the browser window.
  console.log('creating mainWindow from main.js')
  mainWindow = new BrowserWindow({
    show: true,                  // default value = true
    backgroundColor: "#FFF",     // default value = "#FFF"
    width: 1000,                  // default value = 800
    height: 800,                 // default value = 600
    minWidth: 0,                 // default value = 0
    maxWidth: 1600,              // default value = unlimited
    minHeight: 0,                // default value = 0
    maxHeight: 1600,              // default value = unlimited
    resizable: false,             // default value = true
    movable: true,               // default value = true
    alwaysOnTop: false,          // default value = false
    title: "Electron DV Project",           // default value = "Electron"
    frame: true,                 // default value = true
    titleBarStyle: "default",    // default value = "default" (alternative "hidden")
    transparent: false          // default value = false
    // when setting transparent to true, comment out backgroundColor
    })

  // and load the index.html of the app.
  console.log('loading index.html into main browser window')
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  console.log("closing browser windows from main.js")
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
