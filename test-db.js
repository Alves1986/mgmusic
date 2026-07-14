const postgres = require('postgres');
console.log("Connecting to:", process.env.DATABASE_URL);
const sql = postgres(process.env.DATABASE_URL);
sql`SELECT 1`.then(res => {
  console.log("Success:", res);
  sql.end();
}).catch(err => {
  console.error("Error:", err);
  sql.end();
});
