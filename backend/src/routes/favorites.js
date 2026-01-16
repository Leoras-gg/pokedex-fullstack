// src/routes/favorites.js
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../controllers/favoritesController.js";

/**
 * Rotas de Favoritos
 *
 * Responsabilidades:
 * - Gerenciar os Pokémons favoritos de cada usuário
 * - Todas as rotas são protegidas, exigem token JWT válido
 *
 * ❌ Não consulta a PokéAPI
 * ❌ Não altera outros dados do usuário
 */

const router = express.Router();

// 📌 Retorna todos os IDs de Pokémons favoritos do usuário autenticado
// GET /api/favorites
router.get("/", authMiddleware, getFavorites);

// 📌 Adiciona um Pokémon aos favoritos do usuário autenticado
// POST /api/favorites/add
// Body: { pokemonId: string | number }
router.post("/add", authMiddleware, addFavorite);

// 📌 Remove um Pokémon dos favoritos do usuário autenticado
// DELETE /api/favorites/:id
// Params: id = ID do Pokémon a remover
router.delete("/:id", authMiddleware, removeFavorite);

export default router;
