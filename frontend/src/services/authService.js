const API_URL = "http://localhost:3001/api/auth";

export async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao fazer login");
  }

  return response.json(); // { token, user }
}

export async function registerRequest(name, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao registrar");
  }

  return response.json();
}
