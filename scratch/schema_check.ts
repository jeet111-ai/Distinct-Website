import { db } from '../server/db';
import { sql } from 'drizzle-orm';
async function run() {
  const res = await db.execute(sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'bookings';`);
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
run();
