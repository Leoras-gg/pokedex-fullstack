import User from "../models/User.js";

/**
 * Retorna apenas IDs dos Pokémons favoritos
 * Não busca detalhes
 * Não filtra
 * Não pagina
 */
export const getFavorites = async (req, res) => {
  return res.json(req.user.favorites || []);
};

/**
 * Toggle de favorito
 * - Se existir → remove
 * - Se não existir → adiciona
 */
export const toggleFavorite = async (req, res) => {
  const { pokemonId } = req.body;

  if (pokemonId === undefined) {
    return res.status(400).json({ message: "pokemonId é obrigatório" });
  }

  const user = await User.findById(req.user.id);

  const index = user.favorites.indexOf(pokemonId);

  if (index >= 0) {
    user.favorites.splice(index, 1);
  } else {
    user.favorites.push(pokemonId);
  }

  await user.save();

  return res.json(user.favorites);
};
