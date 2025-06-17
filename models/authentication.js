import { NotFoundError, UnauthorizedError } from "infra/errors";
import user from "./user.js";
import password from "./password.js";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação inválidas",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    throw error;
  }

  async function findUserByEmail(email) {
    let storedUser;

    try {
      storedUser = await user.findUserByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email não confere.",
          action: "Verifique se a senha foi enviada corretamente.",
        });
      }

      throw error;
    }
    return storedUser;
  }

  async function validatePassword(providedPassword, storedPassword) {
    const correctPassword = await password.compare(
      providedPassword,
      storedPassword,
    );

    if (!correctPassword) {
      throw new UnauthorizedError({
        message: "Senha inválida",
        action: "Verifique se a senha foi enviada corretamente.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
