import { createContext, useState } from "react";

export const AuthContext = createContext(null);

/**
 * AuthProvider
 * Mantém o estado global de autenticação
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const isAuthenticated = Boolean(token);

  function login(newToken, userData) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
