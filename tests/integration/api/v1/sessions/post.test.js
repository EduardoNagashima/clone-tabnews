import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";
import session from "models/session";
import setCookieParser from "set-cookie-parser";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

beforeEach(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/sessions", () => {
  describe("Anonymous user", () => {
    test("With incorrect `email` but correct `password`", async () => {
      await orchestrator.createUser({
        password: "senha-correta",
      });

      const response = await fetch(`http://localhost:3000/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: "senha-correta",
          email: "email.errado@mail.com",
        }),
      });

      expect(response.status).toBe(401);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "UnauthorizedError",
        status_code: 401,
        message: "Dados de autenticação inválidas",
        action: "Verifique se os dados enviados estão corretos.",
      });
    });

    test("With incorrect `password` but correct `email`", async () => {
      await orchestrator.createUser({
        email: "emailcorreto@mail.com",
      });

      const response = await fetch(`http://localhost:3000/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: "senha-incorreta",
          email: "emailcorreto@mail.com",
        }),
      });

      expect(response.status).toBe(401);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "UnauthorizedError",
        status_code: 401,
        message: "Dados de autenticação inválidas",
        action: "Verifique se os dados enviados estão corretos.",
      });
    });

    test("With incorrect `password` and incorrect `email`", async () => {
      await orchestrator.createUser({});

      const response = await fetch(`http://localhost:3000/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: "senha-incorreta",
          email: "email.incorreto@mail.com",
        }),
      });

      expect(response.status).toBe(401);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "UnauthorizedError",
        status_code: 401,
        message: "Dados de autenticação inválidas",
        action: "Verifique se os dados enviados estão corretos.",
      });
    });

    test("With correct `password` and correct `email`", async () => {
      const createdUser = await orchestrator.createUser({
        password: "senha-correta",
        email: "email.correto@gmail.com",
      });

      const response = await fetch(`http://localhost:3000/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: "senha-correta",
          email: "email.correto@gmail.com",
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        token: responseBody.token,
        user_id: createdUser.id,
        expires_at: responseBody.expires_at,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(Date.parse(responseBody.expires_at)).not.toBeNaN();

      const expiresAt = new Date(responseBody.expires_at);
      const createdAt = new Date(responseBody.created_at);

      expiresAt.setMilliseconds(0);
      createdAt.setMilliseconds(0);

      expect(expiresAt - createdAt).toBe(session.EXPIRATION_IN_MILLISECONDS);

      const parsedSetCookie = setCookieParser(response, {
        map: true,
      });

      expect(parsedSetCookie.session_id).toEqual({
        name: "session_id",
        value: responseBody.token,
        maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
        path: "/",
        httpOnly: true,
      });
    });
  });
});
