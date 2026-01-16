// src/controllers/pokemonController.js
import fetch from "node-fetch";
import { getPokemonCache, setPokemonCache } from "../utils/pokemonCache.js";

/**
 * Limite conhecido da PokéAPI
 * Atualmente existem 1025 Pokémons no endpoint oficial
 */
const MAX_POKEMONS = 1025;

/**
 * Quantidade de requisições simultâneas (batch)
 * Evita estourar o rate limit da PokéAPI
 */
const BATCH_SIZE = 20;

/**
 * Retorna TODOS os Pokémons da PokéAPI
 *
 * Responsabilidades:
 * - Busca lista base
 * - Busca detalhes em lotes (batch)
 * - Cache em memória
 *
 * ❌ Não realiza paginação
 * ❌ Não aplica filtros
 * ❌ Não busca por nome
 *
 * Tudo isso deve ser responsabilidade do frontend
 */
export const getAllPokemons = async (req, res) => {
  try {
    // 1️⃣ Verifica cache em memória
    const cached = getPokemonCache();
    if (cached) {
      return res.json(cached);
    }

    // 2️⃣ Busca lista básica de todos os Pokémons
    const listResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}&offset=0`
    );

    if (!listResponse.ok) {
      throw new Error("Falha ao buscar lista da PokéAPI");
    }

    const listData = await listResponse.json();
    const results = listData.results; // Array de { name, url }

    const pokemons = [];

    // 3️⃣ Busca detalhes dos Pokémons em lotes para não exceder limite da API
    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const batch = results.slice(i, i + BATCH_SIZE);

      // Cria array de promises para cada batch
      const batchPromises = batch.map(item =>
        fetch(item.url)
          .then(res => (res.ok ? res.json() : null))
          .catch(() => null) // Ignora falhas individuais
      );

      // Aguarda todos os fetches do batch
      const batchResults = await Promise.all(batchPromises);

      // 4️⃣ Mapeia cada Pokémon para o formato do frontend
      batchResults.forEach(p => {
        if (!p) return;

        pokemons.push({
          id: p.id, // ID do Pokémon
          name: p.name, // Nome
          types: p.types.map(t => t.type.name), // Array de tipos
          sprite: p.sprites.front_default, // Imagem frontal
          sound: p.cries?.latest || null // Som/crie (se existir)
        });
      });
    }

    // 5️⃣ Salva em cache
    setPokemonCache(pokemons);

    // 6️⃣ Retorna todos os Pokémons
    return res.status(200).json(pokemons);

  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error.message);

    return res.status(500).json({
      message: "Error fetching Pokémons",
      error: error.message
    });
  }
};
