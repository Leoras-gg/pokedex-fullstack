// ==============================
// src/main.jsx
// Ponto de entrada da aplicação React
// ==============================

import React from "react";
import ReactDOM from "react-dom/client"; // API moderna de criação de root
import App from "./App";
// import { AuthProvider } from "./context/AuthContext"; // Futuro provider de autenticação
import "./styles/global.css"; // Estilos globais

// Cria a raiz da aplicação e renderiza o componente App dentro do elemento #root do HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
