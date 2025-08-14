import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

describe("API /api/v1/migrations", () => {
  let baseUrl;

  beforeAll(async () => {
    console.log("Aguardando orchestrator...");
    await orchestrator.waitForAllServices();
    console.log("Limpando banco...");
    await database.query("drop schema public cascade; create schema public;");
    console.log("Setando baseUrl...");
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  });

  test("GET to /api/v1/migrations should return 200", async () => {
    const res = await fetch(`${baseUrl}/api/v1/migrations`);
    expect(res.status).toBe(200);

    const resBody = await res.json();

    expect(Array.isArray(resBody)).toBe(true);
    expect(resBody.length).toBeGreaterThan(0);
  });

  // test("GET to /api/v1/status should return database info", async () => {
  //   const res = await fetch(`${baseUrl}/api/v1/status`);
  //   expect(res.status).toBe(200);

  //   const resBody = await res.json();
  //   expect(resBody.dependencies.database).toBeDefined();
  //   expect(resBody.dependencies.database.version).toBeDefined();
  //   expect(resBody.dependencies.database.max_connections).toBeDefined();
  //   expect(resBody.dependencies.database.active_connections).toBeDefined();

  //   expect(typeof resBody.dependencies.database.version).toBe("string");
  //   expect(typeof resBody.dependencies.database.max_connections).toBe("number");
  //   expect(typeof resBody.dependencies.database.active_connections).toBe(
  //     "number",
  //   );

  //   expect(resBody.dependencies.database.version).toEqual("16.0");
  //   expect(resBody.dependencies.database.max_connections).toEqual(100);
  //   expect(resBody.dependencies.database.active_connections).toEqual(1);
  // });
});
