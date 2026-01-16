// src/routes/pokemonRoutes.js
import { Router } from "express";
import { getAllPokemons } from "../controllers/pokemonController.js";

/**
 * Rotas de Pokémons
 *
 * Responsabilidades:
 * - Retornar todos os Pokémons com informações básicas (id, name, types, sprite, sound)
 * - Cache interno para reduzir requisições à PokéAPI
 */

const router = Router();

// 📌 Retorna TODOS os Pokémons
// GET /api/pokemons/all
// ❗ Resposta: array de objetos { id, name, types, sprite, sound }
router.get("/all", getAllPokemons);

export default router;
