import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

describe("API /api/v1/migrations", () => {
  let baseUrl;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await database.query("drop schema public cascade; create schema public;");
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  }, 120000);

  test("POST to /api/v1/migrations should return 201", async () => {
    const res1 = await fetch(`${baseUrl}/api/v1/migrations`, {
      method: "POST",
    });
    expect(res1.status).toBe(201);

    const res1Body = await res1.json();

    expect(Array.isArray(res1Body)).toBe(true);
    expect(res1Body.length).toBeGreaterThan(0);

    const res2 = await fetch(`${baseUrl}/api/v1/migrations`, {
      method: "POST",
    });
    expect(res2.status).toBe(200);

    const res2Body = await res2.json();

    expect(Array.isArray(res2Body)).toBe(true);
    expect(res2Body.length).toBe(0);
  });

  // test("GET to /api/v1/status should return database info", async () => {
  //   const res1 = await fetch(`${baseUrl}/api/v1/status`);
  //   expect(res1.status).toBe(200);

  //   const res1Body = await res1.json();
  //   expect(res1Body.dependencies.database).toBeDefined();
  //   expect(res1Body.dependencies.database.version).toBeDefined();
  //   expect(res1Body.dependencies.database.max_connections).toBeDefined();
  //   expect(res1Body.dependencies.database.active_connections).toBeDefined();

  //   expect(typeof res1Body.dependencies.database.version).toBe("string");
  //   expect(typeof res1Body.dependencies.database.max_connections).toBe("number");
  //   expect(typeof res1Body.dependencies.database.active_connections).toBe(
  //     "number",
  //   );

  //   expect(res1Body.dependencies.database.version).toEqual("16.0");
  //   expect(res1Body.dependencies.database.max_connections).toEqual(100);
  //   expect(res1Body.dependencies.database.active_connections).toEqual(1);
  // });
});
