const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

console.log("📢 Starting server.js...");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Create SQLite Database ---
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("❌ Error connecting to DB:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// --- Create Table if not exists ---
db.run(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    course TEXT NOT NULL
  )
`);

// --- API to register a student ---
app.post("/register", (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql = "INSERT INTO registrations (name, email, course) VALUES (?, ?, ?)";
  db.run(sql, [name, email, course], function (err) {
    if (err) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// --- API to fetch all students ---
app.get("/registrations", (req, res) => {
  db.all("SELECT * FROM registrations", [], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// --- Start server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
