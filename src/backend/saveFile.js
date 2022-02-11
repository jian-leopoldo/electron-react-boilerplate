const fs = require('fs');
const csv = require('csv-parser');
const { ipcMain, webContents } = require('electron')


function saveFile(file, win) {
  return readFile(file, win);
}

function readCsv(file) {
  let myMap = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      // Build javascript object
      return myMap[row['key']] = row['value'];
    })
    .on('end', () => {
      console.log('Done.');
    });
}

async function readFile(filePath, win) {
  let myMap = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Build javascript object
      // webContents.send("message", row)
      win.webContents.postMessage('fromMain', row)
    })
    .on('end', () => {
      console.log('Done.');
    });
}

module.exports = saveFile;
