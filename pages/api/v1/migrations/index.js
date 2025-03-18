import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import controller from "infra/controller";

const router = createRouter();

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

export async function getHandlers(request, response) {
  const dbClient = await database.getNewClient();

  try {
    const pendingMigrations = await migrationRunner({
      dbClient,
      ...defaultMigrationOptions,
    });

    console.log(pendingMigrations);

    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient?.end();
  }
}

export async function postHandlers(request, response) {
  const dbClient = await database.getNewClient();

  try {
    const migrateMigrations = await migrationRunner({
      dbClient,
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migrateMigrations.length > 0) {
      return response.status(201).json(migrateMigrations);
    }

    return response.status(200).json(migrateMigrations);
  } finally {
    await dbClient?.end();
  }
}

router.get(getHandlers).post(postHandlers);

export default router.handler(controller.errorHandlers);
