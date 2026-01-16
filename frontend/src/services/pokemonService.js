const API_URL = "http://localhost:3001/api/pokemons";

/**
 * Buscar todos os Pokémons (básico)
 */
export async function fetchPokemons() {
  try {
    const response = await fetch(`${API_URL}/all`);

    if (!response.ok) throw new Error("Falha ao buscar Pokémons");

    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data.map(pokemon => ({
      id: Number(pokemon.id),
      name: pokemon.name,
      types: Array.isArray(pokemon.types) ? pokemon.types : [],
      sprite: pokemon.sprite || null,
      sound: pokemon.sound // 🔊 adiciona o cry
    }));
  } catch (error) {
    console.error("Erro no pokemonService:", error);
    return [];
  }
}

/**
 * Buscar detalhes completos de um Pokémon
 * Inclui: types, sprite, abilities, stats, evolutions
 */
export async function fetchPokemonDetails(pokemonId) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!res.ok) throw new Error("Falha ao buscar detalhes do Pokémon");
    const data = await res.json();

    // Buscar espécies e evolução
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    const evoChainRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoChainRes.json();

    // Normalizar evoluções
    const evolutions = [];
    let evo = evoData.chain;
    do {
      const evoId = evo.species.url.split("/").slice(-2, -1)[0];
      evolutions.push({
        id: evoId,
        name: evo.species.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`
      });
      evo = evo.evolves_to[0];
    } while (evo && Object.prototype.hasOwnProperty.call(evo, "evolves_to"));

    // Normalizar stats
    const stats = data.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});

    // Normalizar abilities
    const abilities = data.abilities.map(a => a.ability.name);

    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
      types: data.types.map(t => t.type.name),
      abilities,
      stats,
      evolutions
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes do Pokémon:", err);
    return {
      id: pokemonId,
      name: "",
      sprite: "",
      types: [],
      abilities: [],
      stats: {},
      evolutions: []
    };
  }
}
