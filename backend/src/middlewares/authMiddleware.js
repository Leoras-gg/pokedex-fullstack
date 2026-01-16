// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware de autenticação JWT
 *
 * Responsabilidades:
 * - Verifica se o token JWT foi fornecido no header Authorization
 * - Decodifica e valida o token
 * - Busca o usuário correspondente no banco de dados
 * - Anexa o usuário válido no `req.user` para uso nos controllers
 *
 * Retorna 401 caso:
 * - Token não fornecido
 * - Token inválido ou expirado
 * - Usuário não exista
 */
const authMiddleware = async (req, res, next) => {
  try {
    // ============================
    // 1️⃣ Verifica header Authorization
    // ============================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token não fornecido ou inválido"
      });
    }

    // ============================
    // 2️⃣ Extrai token
    // ============================
    const token = authHeader.split(" ")[1];

    // ============================
    // 3️⃣ Decodifica e verifica token
    // ============================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // ============================
    // 4️⃣ Busca usuário no banco de dados
    // ============================
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // ============================
    // 5️⃣ Usuário válido -> anexa em req e continua
    // ============================
    req.user = user;
    next();

  } catch (error) {
    // ============================
    // Erro geral de autenticação
    // ============================
    console.error("Erro de autenticação:", error.message);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export default authMiddleware;
