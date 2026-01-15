// Cache simples em memória
// Vive enquanto o processo Node estiver ativo

let pokemonCache = null;

/**
 * Retorna o cache atual
 * @returns {Array|null}
 */
export function getPokemonCache() {
  return pokemonCache;
}

/**
 * Armazena os pokémons em cache
 * @param {Array} data
 */
export function setPokemonCache(data) {
  pokemonCache = data;
}
