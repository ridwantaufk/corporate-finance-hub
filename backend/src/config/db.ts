import { Pool } from "pg";

// take a connection url from the environmental variable
const db = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export default db;
