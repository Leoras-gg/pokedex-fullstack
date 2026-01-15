// src/controllers/favoritesController.js
/**
 * Controller de favoritos
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
    const favoritos = Array.isArray(req.user.favoritos)
      ? req.user.favoritos
      : [];

    return res.status(200).json(favoritos);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error.message);
    return res.status(500).json({ message: "Erro ao buscar favoritos" });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { pokemonId } = req.body;

    if (pokemonId === undefined || pokemonId === null) {
      return res.status(400).json({ message: "pokemonId é obrigatório" });
    }

    // Garante número
    const id = Number(pokemonId);

    if (!req.user.favoritos.includes(id)) {
      req.user.favoritos.push(id);
      await req.user.save();
    }

    return res.status(200).json(req.user.favoritos);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error.message);
    return res.status(500).json({ message: "Erro ao adicionar favorito" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const id = Number(req.params.id);

    req.user.favoritos = req.user.favoritos.filter(
      favId => favId !== id
    );

    await req.user.save();

    return res.status(200).json(req.user.favoritos);
  } catch (error) {
    console.error("Erro ao remover favorito:", error.message);
    return res.status(500).json({ message: "Erro ao remover favorito" });
  }
};
