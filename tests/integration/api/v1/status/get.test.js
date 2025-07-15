describe("API /api/v1/status", () => {
  let baseUrl;

  beforeAll(() => {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  });

  test("GET to /api/v1/status should return 200", async () => {
    const res = await fetch(`${baseUrl}/api/v1/status`);
    expect(res.status).toBe(200);

    const resBody = await res.json();

    const parseUpdateAt = new Date(resBody.updated_at).toISOString();
    expect(resBody.updated_at).toEqual(parseUpdateAt);
  });

  test("GET to /api/v1/status should return database info", async () => {
    const res = await fetch(`${baseUrl}/api/v1/status`);
    expect(res.status).toBe(200);

    const resBody = await res.json();
    expect(resBody.dependencies.database).toBeDefined();
    expect(resBody.dependencies.database.version).toBeDefined();
    expect(resBody.dependencies.database.max_connections).toBeDefined();
    expect(resBody.dependencies.database.active_connections).toBeDefined();

    expect(typeof resBody.dependencies.database.version).toBe("string");
    expect(typeof resBody.dependencies.database.max_connections).toBe("number");
    expect(typeof resBody.dependencies.database.active_connections).toBe(
      "number",
    );

    expect(resBody.dependencies.database.version).toEqual("16.0");
    expect(resBody.dependencies.database.max_connections).toEqual(100);
    expect(resBody.dependencies.database.active_connections).toEqual(1);
  });
});
