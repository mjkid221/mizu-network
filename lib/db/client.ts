import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';

import postgres from 'postgres';

const client = postgres(env.POSTGRES_URL);
const db = drizzle(client);

export default db;
