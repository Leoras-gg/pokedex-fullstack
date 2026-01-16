import "../styles/pokemon-card.css";
import typeIcons from "../utils/typeIcons";
import "../styles/types.css";
import { useRef } from "react";

export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }) {
  const audioRef = useRef(null);

  // Função para tocar o cry
  const playCry = () => {
    if (!pokemon.sound) return;

    // Para som anterior, se houver
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(pokemon.sound);
    audioRef.current = audio;
    audio.play().catch(err => console.error("Erro ao tocar cry:", err));
  };

  // Handler ao clicar no card ou na imagem
  const handleClick = () => {
    playCry();
    if (onClick) onClick();
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      {/* Número */}
      <span className="pokemon-id">#{pokemon.id}</span>

      {/* Tipos */}
      <div className="pokemon-types">
        {pokemon.types.map(type => (
          <img
            key={type}
            src={typeIcons[type]}
            alt={type}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            className={`type-icon ${type}`}
          />
        ))}
      </div>

      {/* Sprite */}
      <div className="pokemon-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      {/* Rodapé */}
      <div className="pokemon-footer">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => { 
            e.stopPropagation(); // impede abrir modal e tocar cry ao clicar na estrela
            onToggleFavorite(pokemon.id);
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
