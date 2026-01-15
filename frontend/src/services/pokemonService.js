// src/services/pokemonService.js

const API_URL = "http://localhost:3001/api/pokemons";

/**
 * Busca TODOS os pokémons do backend
 * O backend já faz cache e otimização
 */
export async function fetchPokemons() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar Pokémons");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
