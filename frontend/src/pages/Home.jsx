import { useEffect, useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import PokemonCard from "../components/PokemonCard";

/**
 * Home
 * Camada puramente visual.
 * Toda regra de negócio vive no hook.
 */
export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  const {
    pokemons,
    pagination,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    type,
    setType
  } = usePokemons();

  const [favorites, setFavorites] = useState([]);

  // ============================
  // 🔐 Estado de autenticação
  // ============================

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  return !!localStorage.getItem("token");
});

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    setShowAuth(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setFavorites([]);
    setIsAuthenticated(false);
  }

function openAuthModal() {
  setShowAuth(true);
}


  // ============================
  // 🔐 Favoritos do usuário
  // ============================
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost:3001/api/favorites", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setFavorites(Array.isArray(data) ? data : []))
    .catch(() => setFavorites([]));
}, []);


  // ============================
  // ⭐ Toggle favorito
  // ============================
  async function toggleFavorite(pokemonId) {
  const token = localStorage.getItem("token");
  if (!token) {
    setShowAuth(true);
    return;
  }

  const isAlreadyFavorite = favorites.includes(String(pokemonId)); // ← usar string para consistência

  try {
    let response;

    if (isAlreadyFavorite) {
      // -----------------------------
      // REMOVER FAVORITO
      // -----------------------------
      response = await fetch(`http://localhost:3001/api/favorites/${pokemonId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // -----------------------------
      // ADICIONAR FAVORITO
      // -----------------------------
      response = await fetch("http://localhost:3001/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pokemonId }),
      });
    }

    // Atualiza lista de favoritos com o que o backend retorna
    const data = await response.json();
    setFavorites(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Erro ao atualizar favoritos:", err);
  }
}



  // ⏳ Loading global
  if (loading) {
    return <p>Carregando Pokémons...</p>;
  }

  return (
    <div>
      {/* NAVBAR */}
      <Navbar
        searchText={search}
        setSearchText={value => setSearch(value)}
        setFilterType={value => setType(value)}
        limit={limit}
        setLimit={value => setLimit(Number(value))}
        onLoginClick={openAuthModal}
        isAuthenticated={isAuthenticated}
        onLogoutClick={handleLogout}
      />

      {/* MODAL DE LOGIN / REGISTRO */}
      {showAuth && (
  <AuthModal
    onClose={() => setShowAuth(false)}
    onLoginSuccess={handleLoginSuccess}
  />
)}


      {/* GRID */}
      <div className="grid-container">
        {pokemons.length === 0 && !loading && (
          <p style={{ textAlign: "center", width: "100%" }}>
            Nenhum Pokémon encontrado.
          </p>
        )}

        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(String(pokemon.id))}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <span>
          Página {page} de {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
