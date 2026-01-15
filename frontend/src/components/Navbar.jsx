// src/components/Navbar.jsx
import { useAuth } from "../context/useAuth";


export default function Navbar({ 
  onOpenAuth,
  searchText,
  setSearchText,
  setFilterType,
  limit,
  setLimit
}) {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="navbar">
    <h1>Pokédex</h1>
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <input
        type="text"
        placeholder="Buscar por nome ou ID"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

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

      <select
        value={limit}
        onChange={e => setLimit(e.target.value)}
        style={{ marginLeft: "1rem" }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
      </select>

      {!isAuthenticated ? (
        <button onClick={onOpenAuth}>
          Login / Registro
        </button>
      ) : (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
    </nav>
  );
}
