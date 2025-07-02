import fs from "fs";
import { Client } from "pg";

const isLocalhost = (host) => host === "localhost" || host === "127.0.0.1";

const getSSLConfig = () => {
  if (isLocalhost(process.env.POSTGRES_HOST)) {
    // Local database: no SSL
    return false;
  }
  // Cloud database (e.g., Neon): use CA and validate certificate
  return {
    ca: process.env.NEON_CA_PEM,
    rejectUnauthorized: true,
  };
};

const query = async (queryObject) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLConfig(),
  });
  console.log("Postgres connection details: ", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    environment: process.env.NODE_ENV,
    ssl: getSSLConfig(),
  });
  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    console.error("Err: ", err);
    throw err;
  } finally {
    await client.end();
  }
};

export default {
  query: query,
};
