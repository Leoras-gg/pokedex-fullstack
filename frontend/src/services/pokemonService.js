const API_URL = "http://localhost:3001/api/pokemons";

export async function fetchPokemons() {
  try {
    const response = await fetch(`${API_URL}/all`);

    if (!response.ok) {
      throw new Error("Falha ao buscar Pokémons");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Formato inválido recebido:", data);
      return [];
    }

    return data.map(pokemon => ({
      id: Number(pokemon.id),
      name: pokemon.name,
      types: Array.isArray(pokemon.types) ? pokemon.types : [],
      sprite: pokemon.sprite || null,
      sound: pokemon.sound || null
    }));
  } catch (error) {
    console.error("Erro no pokemonService:", error);
    return [];
  }
}
