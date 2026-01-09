// src/controllers/favoritesController.js
import User from '../models/User.js';

export const getFavorites = async (req, res) => {
  try {
    const favoritos = req.user.favoritos || [];
    res.status(200).json(favoritos); // retorna só os IDs
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
