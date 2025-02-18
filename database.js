const sqlite3 = require("sqlite3").verbose();

// Connect to database
const db = new sqlite3.Database("./payments.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to database");
});

// Create transactions table
db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT UNIQUE,
        amount REAL,
        expected_utr TEXT DEFAULT 'PENDING_UTR',
        status TEXT DEFAULT 'pending'
    )
`);

module.exports = db;
