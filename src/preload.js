const {
  contextBridge,
  ipcRenderer
} = require("electron");

const fs = require("fs")
const dbConfig = require("./config/database.json")
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
  databaseConfig: dbConfig,
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["toMain", "insertDatabase"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
}
);
