import database from "infra/database";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const databaseName = process.env.POSTGRES_DB;
    const databaseVersionResult = await database.query("SHOW server_version;");
    const { server_version } = databaseVersionResult.rows[0];

    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections;",
    );
    const { max_connections } = databaseMaxConnectionsResult.rows[0];

    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    const openedConnections = databaseOpenedConnectionsResult.rows[0].count;

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: server_version,
          max_connections: parseInt(max_connections),
          opened_connections: openedConnections,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Error on status controller", error);
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

export default status;
