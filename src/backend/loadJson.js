const fs = require('fs');


function loadJson(filePath, win) {
  let rawdata = fs.readFileSync(filePath);
  let configs = JSON.parse(rawdata);
  win.webContents.postMessage('sendJson', configs)
}

module.exports = loadJson;
