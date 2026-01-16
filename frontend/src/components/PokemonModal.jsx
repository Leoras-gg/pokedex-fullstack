import "../styles/pokemon-modal.css";
import typeIcons from "../utils/typeIcons";

export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão fechar */}
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Imagem */}
        <div className="modal-image">
          <img src={pokemon.sprite} alt={pokemon.name} />
        </div>

        {/* Tipos */}
        <div className="modal-types">
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

        {/* Habilidades */}
        <div className="modal-section">
          <h4>Habilidades</h4>
          <ul>
            {pokemon.abilities.map(ability => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        </div>

        {/* Estatísticas */}
        <div className="modal-section">
          <h4>Estatísticas</h4>
          <ul>
            {Object.entries(pokemon.stats).map(([stat, value]) => (
              <li key={stat}>
                <strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Evoluções */}
        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <div className="modal-section">
            <h4>Evoluções</h4>
            <div className="modal-evolutions">
              {pokemon.evolutions.map(evo => (
                <div key={evo.id} className="evolution-card">
                  <img src={evo.sprite} alt={evo.name} />
                  <span>{evo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
