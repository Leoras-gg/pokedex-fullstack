// src/services/pokemonService.js
import fetch from "node-fetch";

/**
 * fetchPokemonDetails
 *
 * Responsabilidade:
 * - Buscar detalhes de um Pokémon específico a partir da URL fornecida
 * - Normalizar os dados para o frontend (id, name, types, sprite, sound)
 * - Fail-safe: retorna null em caso de erro, para não quebrar a aplicação
 *
 * @param {string} url - URL da PokéAPI para o Pokémon específico
 * @returns {Object|null} Pokémon normalizado ou null em caso de falha
 */
export const fetchPokemonDetails = async (url) => {
  try {
    // 🔹 Requisição à PokéAPI
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Falha ao buscar Pokémon");
    }

    const data = await response.json();

    // 🔹 Normalização dos dados para frontend
    return {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name), // array de strings
      sprite: data.sprites.front_default,       // imagem do Pokémon
      sound: data.cries?.latest || null        // cries do Pokémon, se disponível
    };
  } catch (error) {
    console.error("Erro no fetchPokemonDetails:", error.message);
    return null; // Fail-safe: evita que o frontend quebre
  }
};
