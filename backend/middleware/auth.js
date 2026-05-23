import jwt from "jsonwebtoken";

function verificarToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não enviado",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();
  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido",
    });
  }
}

export default verificarToken;