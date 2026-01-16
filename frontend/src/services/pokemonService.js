// src/services/pokemonService.js

// URL base da API do backend que retorna todos os Pokémons
const API_URL = `${import.meta.env.VITE_API_URL}/api/pokemons`;


/**
 * fetchPokemons - Busca todos os Pokémons do backend
 * ⚠️ Retorna apenas informações básicas: id, name, types, sprite, sound
 * @returns {Promise<Array>} Array de Pokémons normalizados
 */
export async function fetchPokemons() {
  try {
    // Requisição para o endpoint /all do backend
    const response = await fetch(`${API_URL}/all`);

    if (!response.ok) throw new Error("Falha ao buscar Pokémons");

    const data = await response.json();

    // Garantia de que recebemos um array
    if (!Array.isArray(data)) return [];

    // Normalização dos dados para o frontend
    return data.map(pokemon => ({
      id: Number(pokemon.id),                 // converte para number
      name: pokemon.name,
      types: Array.isArray(pokemon.types) ? pokemon.types : [],
      sprite: pokemon.sprite || null,
      sound: pokemon.sound                     // 🔊 adiciona o cry do Pokémon
    }));
  } catch (error) {
    console.error("Erro no pokemonService:", error);
    return []; // fail-safe: sempre retorna array
  }
}

/**
 * fetchPokemonDetails - Busca informações completas de um Pokémon
 * Inclui tipos, sprite, habilidades, stats e evoluções
 * @param {number|string} pokemonId - ID do Pokémon
 * @returns {Promise<Object>} Objeto normalizado do Pokémon
 */
export async function fetchPokemonDetails(pokemonId) {
  try {
    // 1️⃣ Detalhes básicos do Pokémon na PokéAPI
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!res.ok) throw new Error("Falha ao buscar detalhes do Pokémon");
    const data = await res.json();

    // 2️⃣ Buscar informações da espécie
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    // 3️⃣ Buscar cadeia de evolução
    const evoChainRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoChainRes.json();

    // 4️⃣ Normalizar evoluções
    const evolutions = [];
    let evo = evoData.chain;
    do {
      const evoId = evo.species.url.split("/").slice(-2, -1)[0]; // extrai ID da URL
      evolutions.push({
        id: evoId,
        name: evo.species.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`
      });
      evo = evo.evolves_to[0]; // vai para próxima evolução
    } while (evo && Object.prototype.hasOwnProperty.call(evo, "evolves_to"));

    // 5️⃣ Normalizar stats
    const stats = data.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});

    // 6️⃣ Normalizar abilities
    const abilities = data.abilities.map(a => a.ability.name);

    // 7️⃣ Retorna objeto completo
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

    // fail-safe: retorna objeto vazio com estrutura esperada
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
