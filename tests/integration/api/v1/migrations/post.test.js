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
});
