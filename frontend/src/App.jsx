// ==============================
// src/App.jsx
// Componente raiz da aplicação React
// ==============================

import Home from "./pages/Home";

export default function App() {
  return (
    // Container principal da aplicação
    // Pode ser usado para aplicar estilos globais, background, etc.
    <div className="app-container">
      {/* Página principal */}
      <Home />
    </div>
  );
}
