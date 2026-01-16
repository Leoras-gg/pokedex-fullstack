import { useState } from "react";
import { loginRequest, registerRequest } from "../services/authService";
import "../styles/global.css";

/**
 * Componente AuthModal
 * -------------------
 * Modal de autenticação que permite:
 * - Login
 * - Registro
 * 
 * Props:
 * - onClose: função para fechar a modal
 * - onLoginSuccess: função disparada após login bem-sucedido
 */
export default function AuthModal({ onClose, onLoginSuccess }) {
  // ============================
  // Estados do componente
  // ============================

  // Modo atual da modal: "login" ou "register"
  const [mode, setMode] = useState("login");

  // Formulário controlado
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Mensagem de erro
  const [error, setError] = useState("");

  // Estado de loading para bloquear envio múltiplo
  const [loading, setLoading] = useState(false);

  // ============================
  // Validação de inputs
  // ============================
  // Valida email usando regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Valida senha: mínimo 8 caracteres, ao menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
  function isValidPassword(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  }

  // ============================
  // Handlers
  // ============================

  // Atualiza estado do formulário ao digitar
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Submissão do formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // limpa erro anterior

    // Validação defensiva
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
        // Requisição de login
        const data = await loginRequest(form.email, form.password);

        // Armazena token localmente
        localStorage.setItem("token", data.token);

        // Dispara callback de sucesso
        onLoginSuccess();
      } else {
        // Requisição de registro
        await registerRequest(form.name, form.email, form.password);

        alert("Registro realizado. Faça login.");
        setMode("login"); // muda para login após registro
      }
    } catch (err) {
      setError(err.message); // exibe erro
    } finally {
      setLoading(false);
      // Reset form (mantém email para conveniência)
      setForm({ name: "", email: form.email, password: "" });
    }
  }

  // ============================
  // Render
  // ============================
  return (
    <div className="auth-overlay"> {/* Overlay que cobre toda a tela */}
      <div className="auth-modal"> {/* Modal centralizado */}
        {/* Botão de fechar no canto superior direito */}
        <button className="auth-close" onClick={onClose}>
          ×
        </button>

        {/* Título baseado no modo */}
        <h2>{mode === "login" ? "Login" : "Registro"}</h2>

        {/* Formulário controlado */}
        <form onSubmit={handleSubmit}>
          {/* Campo Nome apenas no registro */}
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

          {/* Exibe mensagem de erro */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Botão submit com texto dinâmico */}
          <button type="submit">
            {loading ? "Processando..." : mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        {/* Switch entre login e registro */}
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
