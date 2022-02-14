const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("./sqlite.db")

let tableQuery = `CREATE TABLE names(
    id INTEGER,
    firstName TEXT,
    lastName TEXT,
    age TEXT,
    visits TEXT,
    progress TEXT,
    status TEXT,
    desc TEXT,
    boolean TEXT
);
`

db.run(tableQuery);


