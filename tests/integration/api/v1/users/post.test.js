import database from "infra/database.js";
import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";
import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "eduardo",
          password: "123456",
          email: "zezimdamanga@mail.com",
        }),
      });

      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "eduardo",
        email: "zezimdamanga@mail.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const userFromDatabase = await user.findUserByUsername("eduardo");
      const isSamePassword = await password.compare(
        "123456",
        userFromDatabase.password,
      );
      const wrongPassword = await password.compare(
        "wrong_password",
        userFromDatabase.password,
      );

      expect(isSamePassword).toBe(true);
      expect(wrongPassword).toBe(false);
    });

    test("With duplicated 'email'", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailDuplicado",
          password: "123456",
          email: "emailDuplicado@mail.com",
        }),
      });

      expect(response.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailDuplicado2",
          password: "123456",
          email: "EmailDuplicado@mail.com",
        }),
      });

      expect(response2.status).toBe(400);

      const responseBody = await response2.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Email já cadastrado",
        action: "Tente novamente com outro email.",
        status_code: 400,
      });
    });

    test("With duplicated 'username'", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "usernameDuplicado",
          password: "123456",
          email: "email@mail.com",
        }),
      });

      expect(response.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "UsernameDuplicado",
          password: "123456",
          email: "outroEmail@mail.com",
        }),
      });

      expect(response2.status).toBe(400);

      const responseBody = await response2.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Username já cadastrado",
        action: "Utilize outro username para essa operação.",
        status_code: 400,
      });
    });
  });
});
