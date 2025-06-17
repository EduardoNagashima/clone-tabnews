import controller from "infra/controller.js";
import authentication from "models/authentication";
import session from "models/session.js";
import { createRouter } from "next-connect";
import * as cookie from "cookie";

const router = createRouter();

async function postHandler(request, response) {
  const userInput = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInput.email,
    userInput.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);

  return response.status(201).json(newSession);
}

router.post(postHandler);

export default router.handler(controller.errorHandlers);
