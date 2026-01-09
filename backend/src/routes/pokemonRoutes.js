import { Router } from "express";
import {
  createPokemon,
  getAllPokemons
} from "../controllers/pokemonController.js";
import validatePokemon from "../middlewares/validatePokemon.js";


const router = Router();

router.post("/pokemons", validatePokemon, createPokemon);
router.get("/pokemons", getAllPokemons);

export default router;
