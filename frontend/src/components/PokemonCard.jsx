import "../styles/pokemon-card.css";
import typeIcons from "../utils/typeIcons";
import "../styles/types.css";


export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="pokemon-card" onClick={onClick}>
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
            e.stopPropagation(); // impede abrir modal ao clicar na estrela
            onToggleFavorite(pokemon.id);
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}

