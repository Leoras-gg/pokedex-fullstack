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

//////////////////////////////
// GET FAVORITES
//////////////////////////////
export const getFavorites = async (req, res) => {
  try {
    // ✅ req.user é preenchido pelo authMiddleware
    // Retorna apenas um array de IDs de Pokémon do usuário
    const favorites = Array.isArray(req.user.favorites)
      ? req.user.favorites
      : [];

    return res.status(200).json(favorites);
  } catch (error) {
    // Log de erro no servidor
    console.error("Erro ao buscar favoritos:", error.message);
    return res.status(500).json({ message: "Erro ao buscar favoritos" });
  }
};

//////////////////////////////
// ADD FAVORITE
//////////////////////////////
export const addFavorite = async (req, res) => {
  console.log("User no controller:", req.user);
  console.log("Favorites atuais:", req.user.favorites);

  try {
    const { pokemonId } = req.body;

    // ✅ Validação básica do ID enviado
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

    // ✅ Adiciona o Pokémon se ainda não estiver nos favoritos
    if (!req.user.favorites.includes(id)) {
      req.user.favorites.push(id);
      // Salva o usuário atualizado no banco
      await req.user.save();
    }

    // ✅ Retorna lista atualizada de favoritos
    return res.status(200).json(req.user.favorites);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error.message);
    return res.status(500).json({ message: "Erro ao adicionar favorito" });
  }
};

//////////////////////////////
// REMOVE FAVORITE
//////////////////////////////
export const removeFavorite = async (req, res) => {
  console.log("User no controller:", req.user);
  console.log("Favorites atuais para REMOVER:", req.user.favorites);

  try {
    const id = String(req.params.id);

    // Proteção: garante que favorites seja array
    if (!Array.isArray(req.user.favorites)) {
      req.user.favorites = [];
    }

    // ✅ Remove o Pokémon dos favoritos, se existir
    req.user.favorites = req.user.favorites.filter(
      favId => favId !== id
    );

    // Salva o usuário atualizado no banco
    await req.user.save();

    // ✅ Retorna lista atualizada de favoritos
    return res.status(200).json(req.user.favorites);
  } catch (error) {
    console.error("Erro ao remover favorito:", error.message);
    return res.status(500).json({ message: "Erro ao remover favorito" });
  }
};
