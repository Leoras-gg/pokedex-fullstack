// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware de autenticação JWT
 * - Valida token
 * - Injeta usuário autenticado em req.user
 * - Mantém formato consistente (sempre objeto User-like)
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Token obrigatório
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido ou inválido" });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 Validação JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Busca usuário real
    const user = await User.findById(decoded.id).select("-senha");
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Erro de autenticação:", error.message);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export default authMiddleware;
