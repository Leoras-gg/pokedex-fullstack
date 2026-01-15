import fetch from "node-fetch";

/**
 * Busca detalhes de um Pokémon específico
 * Retorna dados já normalizados para o frontend
 * Em caso de erro, retorna null (fail-safe)
 */
export const fetchPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Falha ao buscar Pokémon");
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      sprite: data.sprites.front_default,
      sound: data.cries?.latest || null
    };
  } catch (error) {
    console.error("Erro no fetchPokemonDetails:", error.message);
    return null;
  }
};
