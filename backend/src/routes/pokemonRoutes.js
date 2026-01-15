import { Router } from "express";
import { getAllPokemons } from "../controllers/pokemonController.js";

const router = Router();

/**
 * GET /api/pokemon/all
 * Retorna TODOS os Pokémons
 */
router.get("/all", getAllPokemons);

export default router;
