import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
 await database.query('DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;')
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const responseBody = await response.json();

  const migrations = await database.query('SELECT * FROM public.pgmigrations');

  expect(response.status).toBe(201);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(migrations.rows.length).toBeGreaterThan(0);
  expect(responseBody.length).toBe(migrations.rows.length);

  const secondResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const secondResponseBody = await secondResponse.json();

  expect(secondResponse.status).toBe(200);
  expect(Array.isArray(secondResponseBody)).toBe(true);
  expect(secondResponseBody.length).toBe(0);
});
