import bcrypt from "bcrypt";
import db from "./db.js";

const nome = "Pedro Ferraresi";
const email = "phferraresi@gmail.com";
const senha = "19022002";

async function criarAdmin() {
  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    await db.query(
      `
      INSERT INTO usuarios_admin
      (nome, email, senha_hash, ativo)
      VALUES (?, ?, ?, ?)
      `,
      [nome, email, senhaHash, true]
    );

    console.log("Admin criado com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    process.exit(1);
  }
}

criarAdmin();