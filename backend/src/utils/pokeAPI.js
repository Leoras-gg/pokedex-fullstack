// src/utils/pokeAPI.js
import fetch from 'node-fetch';

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error('Pokémon não encontrado');
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    console.error(`Erro ao buscar Pokémon ${id}:`, error.message);
    return null;
  }
};
