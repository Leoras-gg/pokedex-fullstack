let cache = null;

/**
 * Cache simples em memória
 * Vive enquanto o servidor estiver rodando
 */
export const getPokemonCache = () => {
  return cache;
};

export const setPokemonCache = (data) => {
  cache = data;
};
