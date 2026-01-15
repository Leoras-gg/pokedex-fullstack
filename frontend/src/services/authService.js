const API_URL = "http://localhost:3001/api/auth";

/**
 * Realiza login no backend
 * Retorna { token, user }
 */
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao realizar login");
  }

  return response.json();
}

/**
 * Realiza registro de usuário
 */
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao registrar usuário");
  }

  return response.json();
}
