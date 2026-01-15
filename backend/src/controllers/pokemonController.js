import fetch from "node-fetch";
import { getPokemonCache, setPokemonCache } from "../utils/pokemonCache.js";

// Limite conhecido da PokéAPI
const MAX_POKEMONS = 1025;

// Quantidade de requisições simultâneas (protege contra rate limit)
const BATCH_SIZE = 20;

/**
 * Retorna TODOS os Pokémons
 * - Busca lista base
 * - Busca detalhes em lotes
 * - Cache em memória
 *
 * ❌ Não pagina
 * ❌ Não filtra
 * ❌ Não busca por nome
 *
 * Tudo isso é responsabilidade do frontend
 */
export const getAllPokemons = async (req, res) => {
  try {
    // 1️⃣ Cache
    const cached = getPokemonCache();
    if (cached) {
      return res.json(cached);
    }

    // 2️⃣ Lista base
    const listResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}&offset=0`
    );

    if (!listResponse.ok) {
      throw new Error("Falha ao buscar lista da PokéAPI");
    }

    const listData = await listResponse.json();
    const results = listData.results; // [{ name, url }]

    const pokemons = [];

    // 3️⃣ Detalhes em lotes
    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const batch = results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(item =>
        fetch(item.url)
          .then(res => (res.ok ? res.json() : null))
          .catch(() => null)
      );

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(p => {
        if (!p) return;

        pokemons.push({
          id: p.id,
          name: p.name,
          types: p.types.map(t => t.type.name),
          sprite: p.sprites.front_default,
          sound: p.cries?.latest || null
        });
      });
    }

    // 4️⃣ Cache
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
