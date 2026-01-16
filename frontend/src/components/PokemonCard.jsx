// src/components/PokemonCard.jsx

import "../styles/pokemon-card.css";  // Estilos do card
import "../styles/types.css";         // Estilos dos tipos
import typeIcons from "../utils/typeIcons"; // Mapeamento de tipo para ícones
import { useRef } from "react";

/**
 * Componente PokemonCard
 * ----------------------
 * Responsabilidades:
 * - Renderizar o card de cada Pokémon
 * - Mostrar número, tipos, sprite e nome
 * - Botão de favorito (estrela) com callback
 * - Ao clicar no card, tocar o cry do Pokémon e abrir modal (via onClick)
 * 
 * Props:
 * - pokemon: objeto contendo id, name, types, sprite e sound
 * - isFavorite: booleano indicando se é favorito do usuário
 * - onToggleFavorite: função para adicionar/remover favorito
 * - onClick: função disparada ao clicar no card (abre modal)
 */
export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }) {
  const audioRef = useRef(null); // Ref para controlar áudio do cry

  /**
   * Toca o cry do Pokémon
   * - Interrompe qualquer som anterior
   * - Evita erros se sound for null
   */
  const playCry = () => {
    if (!pokemon.sound) return;

    // Interrompe som anterior, se houver
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cria novo objeto de áudio e toca
    const audio = new Audio(pokemon.sound);
    audioRef.current = audio;
    audio.play().catch(err => console.error("Erro ao tocar cry:", err));
  };

  /**
   * Handler do clique no card
   * - Toca o cry
   * - Executa callback onClick (abre modal)
   */
  const handleClick = () => {
    playCry();
    if (onClick) onClick();
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      {/* Número do Pokémon */}
      <span className="pokemon-id">#{pokemon.id}</span>

      {/* Tipos com ícones */}
      <div className="pokemon-types">
        {pokemon.types.map(type => (
          <img
            key={type}
            src={typeIcons[type]}
            alt={type} // texto alternativo
            title={type.charAt(0).toUpperCase() + type.slice(1)} // tooltip
            className={`type-icon ${type}`} // estilo por tipo
          />
        ))}
      </div>

      {/* Sprite do Pokémon */}
      <div className="pokemon-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      {/* Rodapé: Nome e botão de favorito */}
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
