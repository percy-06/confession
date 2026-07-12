const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./confessions.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS confessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL,
            time TEXT NOT NULL
        )
    `);
});

module.exports = db;