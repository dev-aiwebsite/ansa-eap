import { Pool } from "pg";

const pool = new Pool({
  user: "ansaadmin",
  host: "localhost",
  database: "ansa_eap",
  password: "welcometoansa2025",
  port: 5432,
  max: 10, // Limit max connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
});

export default pool;
