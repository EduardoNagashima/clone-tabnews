import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database";
import { ServiceError } from "infra/errors";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function requestMigrationRunner(options) {
  const dbClient = await database.getNewClient();

  try {
    const migration = await migrationRunner({
      dbClient,
      ...defaultMigrationOptions,
      ...options,
    });

    return migration;
  } catch (error) {
    throw new ServiceError({
      cause: error,
      message: "Erro ao acessar o banco de dados",
    });
  } finally {
    await dbClient?.end();
  }
}

async function listPendingMigrations() {
  return requestMigrationRunner({ dryRun: true });
}

async function runMigrations() {
  return requestMigrationRunner({ dryRun: false });
}

const migrator = {
  listPendingMigrations,
  runMigrations,
};

export default migrator;
