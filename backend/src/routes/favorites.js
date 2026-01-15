import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getFavorites,
  toggleFavorite
} from "../controllers/favoritesController.js";

const router = Router();

/**
 * GET /api/favorites
 * Retorna apenas IDs
 */
router.get("/", authMiddleware, getFavorites);

/**
 * POST /api/favorites/add
 * Toggle de favorito
 */
router.post("/add", authMiddleware, toggleFavorite);

export default router;
