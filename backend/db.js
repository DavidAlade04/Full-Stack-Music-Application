const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DBSOURCE = path.join(__dirname, 'data', 'app.db');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error("DB Connection Error:", err.message);
        return;
    }

    console.log("Connected to SQLite database.");

    const sqlPath = path.join(__dirname, 'model.sql');

    if (!fs.existsSync(sqlPath)) {
        console.error("model.sql not found!");
        return;
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');

    db.exec(sql, (err) => {
        if (err) {
            console.error("Error executing model.sql:");
            console.error(err.message);
        } else {
            console.log("Database initialized with model.sql data.");
        }
    });
});

module.exports = db;