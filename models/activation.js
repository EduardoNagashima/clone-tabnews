import database from "infra/database";
import email from "infra/email";
import { NotFoundError } from "infra/errors";
import webserver from "infra/webserver";
import user from "./user";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutes

async function findOneByValidToken(token) {
  const result = runSelectQuery(token);
  return result;

  async function runSelectQuery(token) {
    const result = await database.query({
      text: `
      SELECT * FROM 
        user_activation_tokens
      WHERE 
        id = $1
      AND 
        expires_at > NOW()
      AND 
        used_at IS NULL
      LIMIT 1;
    `,
      values: [token],
    });

    return result.rows[0];
  }
}

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const token = await runInsertQuery(userId, expiresAt);
  return token;

  async function runInsertQuery(userId, expiresAt) {
    const result = await database.query({
      text: `
      INSERT INTO 
        user_activation_tokens (user_id, expires_at)
      VALUES 
        ($1, $2)
      RETURNING *;
    `,
      values: [userId, expiresAt],
    });

    if (result.rows.length === 0) {
      throw new NotFoundError(
        "Error: não foi possível criar o token de ativação valido.",
      );
    }

    return result.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "Eduardo <contato@mail.com.br>",
    to: user.email,
    subject: "Ative seu cadastro",
    text: `${user.username} bem-vindo! Clique no link abaixo para ativar seu cadastro
    
  ${webserver.origin}/cadastro/ativar/${activationToken.id}

Atenciosamente
Equipe Dudu Gameplay,`,
  });
}

async function markTokenAsUsed(activationTokenId) {
  const token = await runUpdateQuery(activationTokenId);
  return token;

  async function runUpdateQuery(id) {
    const result = await database.query({
      text: `
      UPDATE 
        user_activation_tokens 
      SET
        updated_at = timezone('utc', now()),
        used_at = timezone('utc', now())
      WHERE
        id = $1
      RETURNING *;
    `,
      values: [id],
    });

    return result.rows[0];
  }
}

async function activateUserByUserId(userId) {
  const activatedUser = await user.setFeatures(userId, [
    "create:session",
    "read:session",
  ]);
  return activatedUser;
}

const activation = {
  sendEmailToUser,
  create,
  findOneByValidToken,
  markTokenAsUsed,
  activateUserByUserId,
};

export default activation;
