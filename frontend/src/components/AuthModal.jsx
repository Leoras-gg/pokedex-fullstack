import { useState } from "react";
import { loginRequest, registerRequest } from "../services/authService";
import "../styles/global.css";

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  if (!isValidEmail(form.email)) {
    setError("Email inválido.");
    return;
  }

  if (!isValidPassword(form.password)) {
    setError(
      "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial."
    );
    return;
  }

  setLoading(true);


  try {
    if (mode === "login") {
      const data = await loginRequest(form.email, form.password);
      localStorage.setItem("token", data.token);
      onLoginSuccess(); // 👈 AQUI
    } else {
      await registerRequest(form.name, form.email, form.password);
      alert("Registro realizado. Faça login.");
      setMode("login");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
    setForm({ name: "", email: form.email, password: "" });
  }
}


  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>×</button>

        <h2>{mode === "login" ? "Login" : "Registro"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Processando..."
              : mode === "login"
              ? "Entrar"
              : "Registrar"}
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
