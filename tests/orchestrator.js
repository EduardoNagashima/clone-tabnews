import { faker } from "@faker-js/faker/.";
import retry from "async-retry";
import database from "infra/database.js";
import migrator from "models/migrator";
import user from "models/user.js";
import session from "models/session.js";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}/messages`;

async function waitForAllServices() {
  await waitForWebService();
  await waitForEmailServer();

  async function waitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error();
      }
    }
  }

  async function waitForEmailServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(emailHttpUrl);
      if (response.status !== 200) {
        throw new Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

async function runPendingMigrations() {
  return migrator.runMigrations();
}

async function createUser(userObject) {
  return await user.create({
    username:
      userObject.username || faker.internet.username().replace(/[_\-./]/g, ""),
    password: userObject.password || "valid_password",
    email: userObject.email || faker.internet.email(),
  });
}

async function createSession(userId) {
  return await session.create(userId);
}

async function deleteAllEmails() {
  await fetch(emailHttpUrl, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(emailHttpUrl);
  const emailListBody = await emailListResponse.json();
  const lastEmailItem = emailListBody.pop();
  const emailTextResponse = await fetch(
    `${emailHttpUrl}/${lastEmailItem.id}.plain`,
  );
  const emailTextBody = await emailTextResponse.text();

  lastEmailItem.text = emailTextBody;
  return lastEmailItem;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
};

export default orchestrator;
