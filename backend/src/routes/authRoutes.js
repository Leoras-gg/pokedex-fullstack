import { Router } from "express";
import { register, login } from "../controllers/authController.js";

/**
 * Rotas de autenticação
 * - Apenas gestão de usuários
 */
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
