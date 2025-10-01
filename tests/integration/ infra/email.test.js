import email from "infra/email";
import orchestrator from "tests/orchestrator";

describe("infra/email.js", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    orchestrator.deleteAllEmails();
  });

  test("send()", async () => {
    await email.send({
      from: "EduNagashima <eduardo@mail.com>",
      to: "contato@mail.com.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "EduNagashima <eduardo@mail.com>",
      to: "contato@mail.com.br",
      subject: "Último email enviado",
      text: "Teste de corpo.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<eduardo@mail.com>");
    expect(lastEmail.recipients[0]).toBe("<contato@mail.com.br>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Teste de corpo.\n");
  });
});
