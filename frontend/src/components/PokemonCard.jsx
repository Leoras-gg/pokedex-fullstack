import "../styles/pokemon-card.css";
import typeIcons from "../utils/typeIcons";
import "../styles/types.css";


export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  return (
    <div className={`pokemon-card`}>
      {/* Número do Pokémon */}
      <span className="pokemon-id">#{pokemon.id}</span>

      {/* Tipos no canto superior direito */}
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

      {/* Sprite do Pokémon */}
      <div className="pokemon-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      {/* Rodapé: Nome + estrela de favorito */}
      <div className="pokemon-footer">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(pokemon.id)}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
