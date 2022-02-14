const path = require('path');

const { app, BrowserWindow } = require('electron');

require("@electron/remote/main").initialize()
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron')
const saveFile = require("../src/backend/saveFile");
const loadJson = require("../src/backend/loadJson");
const saveData = require("../src/backend/saveData");

// const saveFile = require("")


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../src/preload.js')
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.

  ipcMain.on("toMain", (event, args) => {
    saveFile(args, win)
  });

  ipcMain.on("loadJson", (event, args) => {
    loadJson(args, win)
  });

  ipcMain.on("saveData", (event, args) => {
    // console.log(args)
    saveData(args, win)
  });

  ipcMain.on("insertDatabase", (event, args) => {
    console.log("sended")
    console.log(args)
  });

}


app.whenReady().then(() => {
  createWindow()
  console.log("eaea")
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
