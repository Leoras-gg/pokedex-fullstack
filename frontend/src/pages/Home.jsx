import { useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { fetchPokemonDetails } from "../services/pokemonService";

export default function Home() {
  const { pokemons, pagination, loading, page, setPage, limit, setLimit, search, setSearch, type, setType } = usePokemons();

  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ===== Favoritos =====
  const toggleFavorite = async (pokemonId) => {
    const token = localStorage.getItem("token");
    if (!token) return setShowAuth(true);

    const method = favorites.includes(String(pokemonId)) ? "DELETE" : "POST";
    const url = `http://localhost:3001/api/favorites${method === "DELETE" ? `/${pokemonId}` : "/add"}`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: method === "POST" ? JSON.stringify({ pokemonId }) : undefined
    });

    const data = await res.json();
    setFavorites(Array.isArray(data) ? data : []);
  };

  // ===== Modal =====
  const handleOpenModal = async (pokemon) => {
    setSelectedPokemon({ ...pokemon, abilities: [], stats: {}, evolutions: [], loading: true });
    setShowModal(true);

    const detailedPokemon = await fetchPokemonDetails(pokemon.id);
    setSelectedPokemon({ ...pokemon, ...detailedPokemon, loading: false });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  if (loading) return <p>Carregando Pokémons...</p>;

  return (
    <div>
      <Navbar
        searchText={search}
        setSearchText={setSearch}
        setFilterType={setType}
        limit={limit}
        setLimit={setLimit}
        onLoginClick={() => setShowAuth(true)}
        isAuthenticated={isAuthenticated}
        onLogoutClick={() => { localStorage.removeItem("token"); setFavorites([]); setIsAuthenticated(false); }}
      />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLoginSuccess={() => setIsAuthenticated(true)} />}

      <div className="grid-container">
        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(String(pokemon.id))}
            onToggleFavorite={toggleFavorite}
            onClick={() => handleOpenModal(pokemon)}
          />
        ))}
      </div>

      {showModal && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page} de {pagination.totalPages}</span>
        <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </div>
  );
}
