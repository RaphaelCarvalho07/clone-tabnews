import database from "infra/database";

const status = async (req, res) => {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  res.status(200).json({
    status: "ok",
    message: "API is running smoothly",
    timestamp: new Date().toISOString(),
  });
};

export default status;
