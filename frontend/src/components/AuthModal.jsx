import { useState } from "react";
import ".styles/global.css";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login"); // login | register

  function handleSubmit(e) {
    e.preventDefault();
    alert(`${mode === "login" ? "Login" : "Registro"} (placeholder)`);
    onClose();
  }

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>
          ×
        </button>

        <h2>{mode === "login" ? "Login" : "Registro"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input type="text" placeholder="Nome" />
          )}

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <button type="submit">
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? (
            <>
              Não tem conta?{" "}
              <span onClick={() => setMode("register")}>Registrar</span>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
