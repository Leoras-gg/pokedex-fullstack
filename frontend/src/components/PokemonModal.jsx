export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>×</button>

        {pokemon.loading ? (
          <p>Carregando informações...</p>
        ) : (
          <>
            <h2>{pokemon.name}</h2>

            <div className="modal-image" style={{ textAlign: "center" }}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{ width: "200px", height: "200px" }}
              />
            </div>

            <div className="modal-types" style={{ margin: "10px 0" }}>
              {pokemon.types.map(type => (
                <img
                  key={type}
                  src={`/types/${type}.svg`}
                  alt={type}
                  title={type}
                  className="type-icon"
                  style={{ width: "50px", height: "50px", marginRight: "5px" }}
                />
              ))}
            </div>

            <div className="modal-section">
              <h4>Habilidades</h4>
              <ul>
                {pokemon.abilities.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Estatísticas</h4>
              <ul>
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <li key={stat}><strong>{stat}</strong>: {value}</li>
                ))}
              </ul>
            </div>

            {pokemon.evolutions.length > 0 && (
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
          </>
        )}
      </div>
    </div>
  );
}
