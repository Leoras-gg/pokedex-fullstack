import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../context/useAuth";


/**
 * Modal de autenticação
 * - Alterna entre Login e Registro
 * - Não controla rotas
 * - Vive sobre a Home
 */
export default function AuthModal({ onClose }) {
  const { login } = useAuth();

  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const data = await loginUser({
          email: form.email,
          password: form.password
        });

        login(data.token, data.user);
        onClose();
      } else {
        await registerUser(form);
        setMode("login"); // volta para login após registro
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{mode === "login" ? "Login" : "Criar conta"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              placeholder="Nome"
              value={form.nome}
              onChange={e =>
                setForm({ ...form, nome: e.target.value })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading}>
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        <div className="switch-mode">
          {mode === "login" ? (
            <p>
              Não tem conta?{" "}
              <button onClick={() => setMode("register")}>
                Registrar
              </button>
            </p>
          ) : (
            <p>
              Já tem conta?{" "}
              <button onClick={() => setMode("login")}>
                Fazer login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
