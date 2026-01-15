import { useEffect, useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import Navbar from "../components/Navbar";
//import AuthModal from "../components/AuthModal";
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

    const response = await fetch(
      "http://localhost:3001/api/favorites/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ pokemonId })
      }
    );

    const data = await response.json();
    setFavorites(Array.isArray(data) ? data : []);
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
        onOpenAuth={() => setShowAuth(true)}
      />

      {/* MODAL DE LOGIN / REGISTRO */}
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
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
            isFavorite={favorites.includes(pokemon.id)}
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
