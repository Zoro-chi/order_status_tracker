import { Pool } from "pg";

const pool = new Pool({
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_URI,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	port: 5432, // Default port for PostgreSQL
});

export default pool;
