import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "models/migrator";

const router = createRouter();

async function getHandlers(request, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandlers(request, response) {
  const migrateMigrations = await migrator.runMigrations();

  if (migrateMigrations.length > 0) {
    return response.status(201).json(migrateMigrations);
  }

  return response.status(200).json(migrateMigrations);
}

router.get(getHandlers).post(postHandlers);

export default router.handler(controller.errorHandlers);
