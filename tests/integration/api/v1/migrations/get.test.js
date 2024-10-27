import database from "infra/database.js";
import waitForAllServices from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
});

describe("GET /api/v1/migrations",()=>{
  describe("Anonymous user",()=>{
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
    
      const responseBody = await response.json();
    
      expect(response.status).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  })
})

