import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

describe("API /api/v1/migrations", () => {
  let baseUrl;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await database.query("drop schema public cascade; create schema public;");
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  });

  test("GET to /api/v1/migrations should return 200", async () => {
    const res = await fetch(`${baseUrl}/api/v1/migrations`);
    expect(res.status).toBe(200);

    const resBody = await res.json();

    expect(Array.isArray(resBody)).toBe(true);
    expect(resBody.length).toBeGreaterThan(0);
  });
});
