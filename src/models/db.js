import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';

import { Pool } from 'pg';

const isDevelopment = process.env.NODE_ENV?.toLowerCase().includes('dev');

if (!process.env.DB_URL) {
  throw new Error('DB_URL is not set. Add it to your .env file.');
}

const sslEnabled = process.env.DB_SSL === 'true';

let ssl = false;
if (sslEnabled) {
  const sslConfig = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
  };

  if (process.env.DB_CA_CERT_PATH) {
    const certPath = path.resolve(process.cwd(), process.env.DB_CA_CERT_PATH);
    sslConfig.ca = fs.readFileSync(certPath, 'utf8');
  }

  if (process.env.DB_SSL_SKIP_HOSTNAME_CHECK === 'true') {
    sslConfig.checkServerIdentity = () => undefined;
  }

  ssl = sslConfig;
}

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl,
});

let db = null;

if (isDevelopment && process.env.ENABLE_SQL_LOGGING === 'true') {
  db = {
    async query(text, params) {
      try {
        const start = Date.now();
        const result = await pool.query(text, params);
        const duration = Date.now() - start;

        console.log('Executed query:', {
          text: text.replace(/\s+/g, ' ').trim(),
          duration: `${duration}ms`,
          rows: result.rowCount,
        });

        return result;
      } catch (error) {
        console.error('Error in query:', {
          text: text.replace(/\s+/g, ' ').trim(),
          error: error.message,
        });
        throw error;
      }
    },

    async close() {
      await pool.end();
    },
  };
} else {
  db = pool;
}

export default db;
export { pool };
