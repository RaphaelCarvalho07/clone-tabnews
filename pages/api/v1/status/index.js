import database from "infra/database";

const status = async (req, res) => {
  const updatedAt = new Date().toISOString();

  const { rows: versionRows } = await database.query("SHOW server_version;");
  const { rows: maxConnectionsRows } = await database.query(
    "SHOW max_connections",
  );

  const databaseName = process.env.POSTGRES_DB;
  const { rows: activeConnectionsRows } = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const version = versionRows[0].server_version;
  const maxConnections = parseInt(maxConnectionsRows[0].max_connections, 10);
  const activeConnections = parseInt(activeConnectionsRows[0].count, 10);

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: maxConnections,
        active_connections: activeConnections,
      },
    },
  });
};

export default status;
