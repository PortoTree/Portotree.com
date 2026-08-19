const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

async function main() {
  const sql = postgres(process.env.DATABASE_URL);
  const result = await sql`SELECT content FROM blogs ORDER BY "createdAt" DESC LIMIT 1`;
  console.log("CONTENT:");
  console.log(result[0].content);
  sql.end();
}
main().catch(console.error);
