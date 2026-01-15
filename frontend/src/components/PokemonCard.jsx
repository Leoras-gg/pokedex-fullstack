// src/components/PokemonCard.jsx
import React from "react";

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite
}) {
  if (!pokemon) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center"
      }}
    >
      {/* ID */}
      <div style={{ fontWeight: "bold" }}>#{pokemon.id}</div>

      {/* Sprite */}
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        width={96}
        height={96}
      />

      {/* Nome */}
      <h3 style={{ textTransform: "capitalize" }}>
        {pokemon.name}
      </h3>

      {/* Tipos */}
      <div>
        {pokemon.types?.map(type => (
          <span
            key={type}
            style={{
              marginRight: "0.5rem",
              fontSize: "0.8rem"
            }}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Favorito */}
      <button
        onClick={() => onToggleFavorite(pokemon.id)}
        style={{ marginTop: "0.5rem" }}
      >
        {isFavorite ? "★ Favorito" : "☆ Favoritar"}
      </button>
    </div>
  );
}
