// src/controllers/favoritesController.js
import User from '../models/User.js';
import { fetchPokemonDetails } from '../utils/pokeAPI.js';

export const getFavorites = async (req, res) => {
  try {
    const { page = 1, limit = 5, type, search } = req.query;

    let favoritosIds = req.user.favoritos || [];

    // Buscar detalhes completos
    let favoritosDetalhes = await Promise.all(
      favoritosIds.map(id => fetchPokemonDetails(id))
    );

    favoritosDetalhes = favoritosDetalhes.filter(p => p !== null);

    // Aplicar filtro por tipo
    if (type) {
      favoritosDetalhes = favoritosDetalhes.filter(p =>
        p.types.includes(type.toLowerCase())
      );
    }

    // Aplicar busca por nome ou id
    if (search) {
      favoritosDetalhes = favoritosDetalhes.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toString() === search
      );
    }

    // Paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginated = favoritosDetalhes.slice(startIndex, endIndex);

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: favoritosDetalhes.length,
      results: paginated,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar favoritos', error });
  }
};


export const addFavorite = async (req, res) => {
  try {
    const { pokemonId } = req.body;
    if (pokemonId === undefined) return res.status(400).json({ message: 'ID do Pokémon é obrigatório' });

    // Evita duplicados
    if (!req.user.favoritos.includes(pokemonId)) {
      req.user.favoritos.push(pokemonId);
      await req.user.save();
    }

    res.status(201).json({
      message: 'Favorito adicionado com sucesso',
      favoriteId: pokemonId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar favorito', error });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.id);
    if (!req.user.favoritos.includes(pokemonId)) {
      return res.status(404).json({ message: 'Pokémon não está nos favoritos' });
    }

    req.user.favoritos = req.user.favoritos.filter(id => id !== pokemonId);
    await req.user.save();

    res.status(200).json({ message: 'Favorito removido com sucesso', removedId: pokemonId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover favorito', error });
  }
};
