import controller from "infra/controller.js";
import authentication from "models/authentication";
import session from "models/session.js";
import { createRouter } from "next-connect";

const router = createRouter();

async function postHandler(request, response) {
  const userInput = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInput.email,
    userInput.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  controller.setSessionCookie(newSession.token, response);

  return response.status(201).json(newSession);
}

async function deleteHandler(request, response) {
  const sessionToken = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(sessionToken);
  const deletedSession = await session.expireById(sessionObject.id);
  controller.clearSessionCookie(response);

  return response.status(200).json(deletedSession);
}

router.post(postHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);
