import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ============================
    // 1️⃣ Header
    // ============================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido ou inválido" });
    }

    // ============================
    // 2️⃣ Token (ANTES de usar)
    // ============================
    const token = authHeader.split(" ")[1];

    // ============================
    // 3️⃣ Decodificação
    // ============================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // ============================
    // 4️⃣ Usuário
    // ============================
    const user = await User.findById(userId).select("-password");

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
