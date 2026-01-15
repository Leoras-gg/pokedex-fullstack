import "../styles/pokemon-card.css";
import "../styles/types.css";

export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const mainType = pokemon.types?.[0] || "normal";

  return (
    <div className={`pokemon-card type-${mainType}`}>
      <span className="pokemon-id">#{pokemon.id}</span>

      <div className="pokemon-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      <div className="pokemon-info">
        <h3>{pokemon.name}</h3>

        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>

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
