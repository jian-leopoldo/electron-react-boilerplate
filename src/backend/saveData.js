const sqlite3 = require("sqlite3")


function insertDb({ config, rows }, win) {
  let db = new sqlite3.Database(config.database)

  const keys = config.table_columns

  const placeHolders = keys.map(key => "?").join(',')
  const fields = keys.map(key => key).join(",")

  const query = `INSERT INTO ${config.table_name}(${fields}) VALUES (${placeHolders})`

  let rowsInserted = 0

  Promise.resolve({
    then: function () {
      rows.map(row => {
        db.run(query, [...Object.values(row)], function (err) {
          if (err) {
            console.error(err)
          }
          rowsInserted += 1
          if (rows.length == rowsInserted) {
            win.webContents.postMessage('allDataSaved', rows.length)

            console.log("inseriu tudo!!")
          }
        })
      })
    }
  }
  ).then(console.log("foi"))



}

module.exports = insertDb;
