import database from "infra/database.js";
import waitForAllServices from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
});

describe("POST /api/v1/migrations", ()=>{
  describe("Anonymous user", ()=>{
    describe("Running pending migrations", ()=>{
      test("For the first time", async () => {
        const response = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
      
        const responseBody = await response.json();
      
        const migrations = await database.query("SELECT * FROM public.pgmigrations");
      
        expect(response.status).toBe(201);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(migrations.rows.length).toBeGreaterThan(0);
        expect(responseBody.length).toBe(migrations.rows.length);
      });
      test("For the second time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
      
        const responseBody = await response.json();
      
        expect(response.status).toBe(200);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBe(0);
      });
    })
  })
})
