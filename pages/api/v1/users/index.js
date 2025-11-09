import controller from "infra/controller.js";
import activation from "models/activation";
import user from "models/user.js";
import { createRouter } from "next-connect";

const router = createRouter();

async function postHandler(request, response) {
  const userInput = request.body;
  const newUser = await user.create(userInput);

  const activationToken = await activation.create(newUser.id);
  await activation.sendEmailToUser(newUser, activationToken);

  return response.status(201).json(newUser);
}

router.post(postHandler);

export default router.handler(controller.errorHandlers);
