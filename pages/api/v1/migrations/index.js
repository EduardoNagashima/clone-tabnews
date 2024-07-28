import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  try {
    switch (request.method) {
    case "GET": {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
  
      return response.status(200).json(pendingMigrations);
    }
    case "POST": {
      const migrateMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
  
      if (migrateMigrations.length > 0) {
        return response.status(201).json(migrateMigrations);
      }
  
      return response.status(200).json(migrateMigrations);
    }
    default:
      return response.status(405).json({
        error: `Method ${request.method} not allowed`
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao fazer a requisiçao.');
  } finally {
    await dbClient.end();
  }
}
