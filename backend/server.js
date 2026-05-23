import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "./db.js";
import upload from "./multer.js";
import verificarToken from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Alameda Kennedy funcionando!");
});

/* LOGIN */

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [usuarios] = await db.query(
      "SELECT * FROM usuarios_admin WHERE email = ? AND ativo = 1",
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos",
      });
    }

    const usuario = usuarios[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({
      sucesso: true,
      token,
usuario: {
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  tipo: usuario.tipo,
},
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao fazer login",
    });
  }
});

/* ADMINS */

app.get(
  "/admins",
  verificarToken,
  async (req, res) => {
    try {
      const [admins] = await db.query(`
        SELECT
          id,
          nome,
          email,
          ativo,
          criado_em
        FROM usuarios_admin
      `);

      res.json(admins);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao buscar admins",
      });
    }
  }
);

app.post(
  "/admins",
  verificarToken,
  async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      const senhaHash = await bcrypt.hash(senha, 10);

      const [resultado] = await db.query(
        `
        INSERT INTO usuarios_admin
        (nome, email, senha_hash, ativo)
        VALUES (?, ?, ?, ?)
        `,
        [nome, email, senhaHash, true]
      );

      res.json({
        sucesso: true,
        id: resultado.insertId,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao criar admin",
      });
    }
  }
);

app.put(
  "/admins/:id/desativar",
  verificarToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      await db.query(
        `
        UPDATE usuarios_admin
        SET ativo = false
        WHERE id = ?
        `,
        [id]
      );

      res.json({
        sucesso: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao desativar admin",
      });
    }
  }
);

app.put(
  "/admins/:id/ativar",
  verificarToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      await db.query(
        `
        UPDATE usuarios_admin
        SET ativo = true
        WHERE id = ?
        `,
        [id]
      );

      res.json({ sucesso: true });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao ativar admin",
      });
    }
  }
);

/* PRODUTOS */

app.get("/produtos", async (req, res) => {
  try {
    const { admin } = req.query;

    const sql =
      admin === "true"
        ? "SELECT * FROM produtos"
        : "SELECT * FROM produtos WHERE disponivel = 1";

    const [produtos] = await db.query(sql);

    res.json(produtos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao buscar produtos",
    });
  }
});

app.post(
  "/produtos",
  verificarToken,
  async (req, res) => {
    try {
      const {
        nome,
        descricao,
        preco,
        categoria,
        imagem,
        disponivel,
      } = req.body;

      const [resultado] = await db.query(
        `
        INSERT INTO produtos
        (nome, descricao, preco, categoria, imagem, disponivel)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          nome,
          descricao,
          preco,
          categoria,
          imagem || "",
          disponivel ?? true,
        ]
      );

      res.json({
        sucesso: true,
        id: resultado.insertId,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao adicionar produto",
      });
    }
  }
);

app.put(
  "/produtos/:id",
  verificarToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nome,
        descricao,
        preco,
        categoria,
        imagem,
        disponivel,
      } = req.body;

      await db.query(
        `
        UPDATE produtos
        SET
          nome = ?,
          descricao = ?,
          preco = ?,
          categoria = ?,
          imagem = ?,
          disponivel = ?
        WHERE id = ?
        `,
        [
          nome,
          descricao,
          preco,
          categoria,
          imagem || "",
          disponivel ?? true,
          id,
        ]
      );

      res.json({
        sucesso: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao atualizar produto",
      });
    }
  }
);

app.delete(
  "/produtos/:id",
  verificarToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      await db.query(
        "DELETE FROM produtos WHERE id = ?",
        [id]
      );

      res.json({
        sucesso: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao excluir produto",
      });
    }
  }
);

/* UPLOAD DE IMAGEM */

app.post(
  "/upload",
  verificarToken,
  upload.single("imagem"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          erro: "Nenhuma imagem enviada",
        });
      }

      res.json({
        url: req.file.path,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao fazer upload da imagem",
      });
    }
  }
);

/* CATEGORIAS */

app.get("/categorias", async (req, res) => {
  try {
    const [categorias] = await db.query(
      "SELECT * FROM categorias WHERE ativo = 1 ORDER BY ordem ASC, nome ASC"
    );

    res.json(categorias);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao buscar categorias",
    });
  }
});

app.post(
  "/categorias",
  verificarToken,
  async (req, res) => {
    try {
      const { nome, ordem } = req.body;

      const [resultado] = await db.query(
        `
        INSERT INTO categorias
        (nome, ordem, ativo)
        VALUES (?, ?, ?)
        `,
        [
          nome.toUpperCase(),
          ordem || 0,
          true,
        ]
      );

      res.json({
        sucesso: true,
        id: resultado.insertId,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao adicionar categoria",
      });
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${process.env.PORT}`
  );
});