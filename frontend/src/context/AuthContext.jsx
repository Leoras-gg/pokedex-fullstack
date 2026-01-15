import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Hook de acesso ao AuthContext
 */
export function useAuth() {
  return useContext(AuthContext);
}
