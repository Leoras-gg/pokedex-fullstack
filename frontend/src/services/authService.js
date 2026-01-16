// src/services/authService.js

// URL base da API de autenticação
const API_URL = "http://localhost:3001/api/auth";

/**
 * loginRequest - realiza login do usuário
 * @param {string} email - email do usuário
 * @param {string} password - senha do usuário
 * @returns {Promise<object>} - retorna { token, user } em caso de sucesso
 * @throws Error - lança erro com mensagem da API em caso de falha
 */
export async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }) // envia email e senha no corpo
  });

  // Se a resposta não for ok, captura a mensagem de erro da API
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao fazer login");
  }

  // Retorna os dados do login
  return response.json(); // { token, user }
}

/**
 * registerRequest - registra novo usuário
 * @param {string} name - nome do usuário
 * @param {string} email - email do usuário
 * @param {string} password - senha do usuário
 * @returns {Promise<object>} - retorna { message, userId } em caso de sucesso
 * @throws Error - lança erro com mensagem da API em caso de falha
 */
export async function registerRequest(name, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }) // envia dados do usuário
  });

  // Se a resposta não for ok, captura a mensagem de erro da API
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao registrar");
  }

  // Retorna os dados do registro
  return response.json();
}
