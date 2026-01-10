import 'server-only';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Missing NEON_DATABASE_URL environment variable for database connection.');
}

const sql = neon(databaseUrl);
const db = drizzle({ client: sql });

export default db;
