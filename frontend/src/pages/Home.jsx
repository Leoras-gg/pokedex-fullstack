// src/pages/Home.jsx
import { useState, useRef } from "react";
import { usePokemons } from "../hooks/usePokemons";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { fetchPokemonDetails } from "../services/pokemonService";

/**
 * Home - Página principal da Pokédex
 *
 * Responsabilidades:
 * - Mostrar Navbar com busca, filtro e login/logout
 * - Listar Pokémons em grid com paginação
 * - Gerenciar favoritos do usuário
 * - Abrir modal de detalhes do Pokémon com cry
 * - Abrir modal de login/registro
 */
export default function Home() {
  // ============================
  // 🔹 Hook customizado para Pokémons
  // ============================
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
    setType
  } = usePokemons();

  // ============================
  // 🔹 Estados de UI
  // ============================
  const [favorites, setFavorites] = useState([]);          // IDs de favoritos do usuário
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);         // controla modal de login/registro
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon selecionado para modal
  const [showModal, setShowModal] = useState(false);       // controla modal de detalhes do Pokémon
  

  // ============================
  // 🔹 Ref de áudio
  // ============================
  const audioRef = useRef(null); // controla o cry do Pokémon

  // ============================
  // 🔹 Função para adicionar/remover favoritos
  // ============================
  const toggleFavorite = async (pokemonId) => {
    const token = localStorage.getItem("token");
    if (!token) return setShowAuth(true); // se não logado, abre modal de login

    const method = favorites.includes(String(pokemonId)) ? "DELETE" : "POST";
    const API_BASE = import.meta.env.VITE_API_URL;

const url = `${API_BASE}/api/favorites${
  method === "DELETE" ? `/${pokemonId}` : "/add"
}`;


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

  // ============================
  // 🔹 Abrir modal de detalhes
  // ============================
  const handleOpenModal = async (pokemon) => {
    // Fecha som anterior
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Abre modal com loading
    setSelectedPokemon({ ...pokemon, abilities: [], stats: {}, evolutions: [], loading: true });
    setShowModal(true);

    // Busca detalhes do Pokémon (habilidades, stats, evoluções)
    const detailedPokemon = await fetchPokemonDetails(pokemon.id);
    setSelectedPokemon({ ...pokemon, ...detailedPokemon, loading: false });

    // Toca o cry, se existir
    if (pokemon.sound) {
      const audio = new Audio(pokemon.sound);
      audioRef.current = audio;
      audio.play().catch(err => console.error("Erro ao tocar cry:", err));
    }
  };

  // ============================
  // 🔹 Fechar modal
  // ============================
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);

    // Para o som do cry
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // ============================
  // 🔹 Loading inicial
  // ============================
  if (loading) return <p>Carregando Pokémons...</p>;

  // ============================
  // 🔹 Render
  // ============================
  return (
    <div>
      {/* Navbar com busca, filtro e login/logout */}
      <Navbar
        searchText={search}
        setSearchText={setSearch}
        setFilterType={setType}
        limit={limit}
        setLimit={setLimit}
        onLoginClick={() => setShowAuth(true)}
        isAuthenticated={isAuthenticated}
        onLogoutClick={() => {
          localStorage.removeItem("token");
          setFavorites([]);
          setIsAuthenticated(false);
        }}
      />

      {/* Modal de login/registro */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      )}

      {/* Grid de Pokémons */}
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

      {/* Modal de detalhes do Pokémon */}
      {showModal && selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={handleCloseModal}
        />
      )}

      {/* Paginação */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page} de {pagination.totalPages}</span>
        <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </div>
  );
}
