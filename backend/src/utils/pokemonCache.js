// src/utils/pokemonCache.js

/**
 * Cache simples em memória para Pokémons
 * - Vive apenas enquanto o servidor estiver rodando
 * - Evita requisições repetidas à PokéAPI
 */
let cache = null;

/**
 * getPokemonCache
 * Retorna os dados em cache se existirem
 *
 * @returns {Array|null} Array de Pokémons ou null se não houver cache
 */
export const getPokemonCache = () => {
  return cache;
};

/**
 * setPokemonCache
 * Atualiza o cache em memória com os dados fornecidos
 *
 * @param {Array} data - Array de Pokémons para armazenar no cache
 */
export const setPokemonCache = (data) => {
  cache = data;
};
