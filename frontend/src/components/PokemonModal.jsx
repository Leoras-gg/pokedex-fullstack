// src/components/PokemonModal.jsx

/**
 * Componente PokemonModal
 * ----------------------
 * Responsabilidades:
 * - Exibir detalhes de um Pokémon selecionado
 * - Mostrar sprite, tipos, habilidades, estatísticas e evoluções
 * - Overlay clicável para fechar o modal
 *
 * Props:
 * - pokemon: objeto com dados detalhados do Pokémon
 * - onClose: função disparada ao fechar o modal
 */
export default function PokemonModal({ pokemon, onClose }) {
  // Fail-safe: se não houver Pokémon, não renderiza nada
  if (!pokemon) return null;

  return (
    // Overlay (cobre toda a tela)
    <div className="auth-overlay" onClick={onClose}>
      {/* Container do modal, impede o clique do overlay de propagar */}
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botão X para fechar */}
        <button className="auth-close" onClick={onClose}>×</button>

        {/* Loading */}
        {pokemon.loading ? (
          <p>Carregando informações...</p>
        ) : (
          <>
            {/* Nome do Pokémon */}
            <h2>{pokemon.name}</h2>

            {/* Sprite do Pokémon */}
            <div className="modal-image" style={{ textAlign: "center" }}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{ width: "200px", height: "200px" }}
              />
            </div>

            {/* Tipos do Pokémon */}
            <div className="modal-types" style={{ margin: "10px 0" }}>
              {pokemon.types.map(type => (
                <img
                  key={type}
                  src={`/types/${type}.svg`} // caminho dos ícones de tipo
                  alt={type} // acessibilidade
                  title={type.charAt(0).toUpperCase() + type.slice(1)} // tooltip
                  className="type-icon"
                  style={{ width: "50px", height: "50px", marginRight: "5px" }}
                />
              ))}
            </div>

            {/* Habilidades */}
            <div className="modal-section">
              <h4>Habilidades</h4>
              <ul>
                {pokemon.abilities.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>

            {/* Estatísticas */}
            <div className="modal-section">
              <h4>Estatísticas</h4>
              <ul>
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <li key={stat}>
                    <strong>{stat}</strong>: {value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Evoluções (se existirem) */}
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
