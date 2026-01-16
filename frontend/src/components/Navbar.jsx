// src/components/Navbar.jsx

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
      <h1>Pokédex</h1>

      {/* Controles da barra */}
      <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        
        {/* Input de busca */}
        <input
          type="text"
          placeholder="Buscar por nome ou ID"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ marginRight: "1rem" }}
        />

        {/* Select de filtro por tipo */}
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="grass">Planta</option>
          <option value="fire">Fogo</option>
          <option value="water">Água</option>
          <option value="electric">Elétrico</option>
          <option value="psychic">Psíquico</option>
          <option value="rock">Pedra</option>
          <option value="ground">Terra</option>
        </select>

        {/* Select de quantidade por página */}
        <select
          value={limit}
          onChange={e => setLimit(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
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
