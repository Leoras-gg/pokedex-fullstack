import fetch from "node-fetch";
import { fetchPokemonDetails } from "../utils/pokeAPI.js";
import { getPokemonCache, setPokemonCache } from "../utils/pokemonCache.js";

// Limite máximo conhecido da PokéAPI
const MAX_POKEMONS = 1025;

// Limite de concorrência para evitar rate limit
const BATCH_SIZE = 20;

/**
 * Retorna todos os Pokémons da PokéAPI
 *
 * Estratégia:
 * - 1 request para lista base
 * - fetch de detalhes em lotes
 * - cache em memória
 *
 * ❌ Sem paginação
 * ❌ Sem filtros
 * (essas regras pertencem ao frontend)
 */
export const getAllPokemons = async (req, res) => {
  try {
    // ============================
    // 1️⃣ Cache em memória
    // ============================
    const cached = getPokemonCache();
    if (cached) {
      return res.status(200).json(cached);
    }

    // ============================
    // 2️⃣ Lista base da PokéAPI
    // ============================
    const listResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}&offset=0`
    );

    if (!listResponse.ok) {
      throw new Error("Falha ao buscar lista da PokéAPI");
    }

    const listData = await listResponse.json();
    const results = listData.results; // [{ name, url }]

    const pokemons = [];

    // ============================
    // 3️⃣ Fetch de detalhes em lotes
    // ============================
    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const batch = results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(item =>
        fetchPokemonDetails(item.url)
      );

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(pokemon => {
        if (pokemon) {
          pokemons.push(pokemon);
        }
      });
    }

    // ============================
    // 4️⃣ Cache do resultado
    // ============================
    setPokemonCache(pokemons);

    return res.status(200).json(pokemons);

  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error.message);

    return res.status(500).json({
      message: "Error fetching Pokémons",
      error: error.message
    });
  }
};
