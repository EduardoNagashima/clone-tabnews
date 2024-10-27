import waitForAllServices from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Should get current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      const convertedUpdatedAt = new Date(responseBody.updated_at).toISOString();

      expect(response.status).toBe(200);
      expect(responseBody.updated_at).toBeDefined();
      expect(responseBody.updated_at).toEqual(convertedUpdatedAt);
      expect(responseBody.dependencies.database.version).toEqual("16.2");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    })
  })
});
