// src/controllers/favoritesController.js
/**
 * Controller de favorites
 *
 * Responsabilidades:
 * - Persistir apenas IDs de Pokémon no usuário
 * - Não consultar PokéAPI
 * - Não aplicar filtros ou paginação
 *
 * Toda renderização é responsabilidade do frontend
 */

export const getFavorites = async (req, res) => {
  try {
    // Retorna apenas um array simples de IDs
    const favorites = Array.isArray(req.user.favorites)
      ? req.user.favorites
      : [];

    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error.message);
    return res.status(500).json({ message: "Erro ao buscar favoritos" });
  }
};

export const addFavorite = async (req, res) => {
  console.log("User no controller:", req.user);
  console.log("Favorites atuais:", req.user.favorites);

  try {
    const { pokemonId } = req.body;

    if (pokemonId === undefined || pokemonId === null) {
      return res.status(400).json({ message: "pokemonId é obrigatório" });
    }

    const id = String(pokemonId);

    // ==========================
    // Proteção: garante que favorites seja array
    // ==========================
    if (!Array.isArray(req.user.favorites)) {
      req.user.favorites = [];
    }

    if (!req.user.favorites.includes(id)) {
      req.user.favorites.push(id);
      await req.user.save();
    }

    return res.status(200).json(req.user.favorites);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error.message);
    return res.status(500).json({ message: "Erro ao adicionar favorito" });
  }
};


export const removeFavorite = async (req, res) => {
  console.log("User no controller:", req.user);
  console.log("Favorites atuais para REMOVER:", req.user.favorites);
  try {
    const id = String(req.params.id);

    // Proteção
    if (!Array.isArray(req.user.favorites)) {
      req.user.favorites = [];
    }

    req.user.favorites = req.user.favorites.filter(
      favId => favId !== id
    );

    await req.user.save();

    return res.status(200).json(req.user.favorites);
  } catch (error) {
    console.error("Erro ao remover favorito:", error.message);
    return res.status(500).json({ message: "Erro ao remover favorito" });
  }
};

