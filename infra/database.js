import { Client } from "pg";

// const isLocalhost = (host) => host === "localhost" || host === "127.0.0.1";

// const getSSLConfig = () => {
//   if (isLocalhost(process.env.POSTGRES_HOST)) {
//     // Local database: no SSL
//     return false;
//   }
//   // Cloud database (e.g., Neon): use CA and validate certificate
//   return {
//     ca: process.env.NEON_CA_PEM,
//     rejectUnauthorized: true,
//   };
// };

const query = async (queryObject) => {
  let client;

  try {
    client = await getNewClient();
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    console.error("Err: ", err);
    throw err;
  } finally {
    await client.end();
  }
};

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLConfig(),
    // ssl: process.env.NODE_ENV === "development" ? true : true,
  });

  await client.connect();
  return client;
};
const database = {
  query,
  getNewClient,
};

export default database;

const getSSLConfig = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
};
