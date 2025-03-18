import { Client } from "pg";
import { ServiceError } from "./errors";

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });

  await client.connect();
  return client;
}

async function query(queryObject) {
  let result = null;
  let client;

  try {
    client = await getNewClient();
    result = await client.query(queryObject);
  } catch (error) {
    throw new ServiceError({
      cause: error,
    });
  } finally {
    await client?.end();
  }

  return result;
}

const database = {
  query,
  getNewClient,
};

export default database;
