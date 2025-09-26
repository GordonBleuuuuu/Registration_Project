const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("❌ Error creating DB:", err.message);
  } else {
    console.log("✅ Database created successfully.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      course TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error("❌ Table creation failed:", err.message);
    else console.log("✅ Table 'registrations' created.");
  });
});

db.close();
