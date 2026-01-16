// src/components/Navbar.jsx

import "../styles/navbar.css";        // Estilos da navbar
import pokeball from "../assets/type-icons/pokeball.svg";

/**
 * Componente Navbar
 * -----------------
 * Barra de navegação principal da Pokédex.
 * Permite:
 * - Buscar Pokémon por nome ou ID
 * - Filtrar por tipo
 * - Selecionar quantidade de resultados por página
 * - Acessar login/registro ou logout
 * 
 * Props:
 * - searchText: string atual do campo de busca
 * - setSearchText: função para atualizar a busca
 * - setFilterType: função para atualizar filtro de tipo
 * - limit: número de itens por página
 * - setLimit: função para atualizar limite
 * - isAuthenticated: booleano indicando se o usuário está logado
 * - onLoginClick: função chamada ao clicar em login/registro
 * - onLogoutClick: função chamada ao clicar em logout
 */
export default function Navbar({ 
  searchText,
  setSearchText,
  setFilterType,
  limit,
  setLimit,
  isAuthenticated,
  onLoginClick,
  onLogoutClick
}) {
  return (
    <nav className="navbar">
      {/* Título / Logo */}
      <div>
      <h1>Pokédex interativa</h1>
      <img
          src={pokeball}
          alt="Pokéball"
          className="navbar-logo"
        />
      </div>
      {/* Controles da barra */}
      <div>
        
        {/* Input de busca */}
        <input
          type="text"
          placeholder="Buscar por nome ou ID"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        {/* Select de filtro por tipo */}
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="normal">Normal</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>

        {/* Select de quantidade por página */}
        <select
          value={limit}
          onChange={e => setLimit(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </select>

        {/* Botão de login/registro ou logout */}
        {!isAuthenticated ? (
          <button onClick={onLoginClick} style={{ marginLeft: "1rem" }}>
            Login / Registro
          </button>
        ) : (
          <button onClick={onLogoutClick} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
