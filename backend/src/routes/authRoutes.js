// src/routes/authRoutes.js
import { Router } from "express";
import { register, login } from "../controllers/authController.js";

/**
 * Rotas de autenticação
 *
 * Responsabilidades:
 * - Registrar novos usuários
 * - Autenticar usuários existentes (login)
 */
const router = Router();

// 📌 Registrar um novo usuário
// Recebe { email, password } no corpo da requisição
router.post("/register", register);

// 📌 Login de usuário existente
// Recebe { email, password } no corpo da requisição
router.post("/login", login);

export default router;
