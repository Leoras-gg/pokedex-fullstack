// src/hooks/usePokemons.js
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";

/**
 * usePokemons - Hook central para gerenciar a lista de Pokémons
 *
 * Responsabilidades:
 * - Buscar todos os Pokémons uma única vez do backend
 * - Cache em memória (evita múltiplas requisições)
 * - Suporte a pesquisa por nome ou ID com debounce
 * - Filtro por tipo
 * - Paginação frontend
 *
 * ❌ Não renderiza nada diretamente
 * ❌ Não conhece UI
 */
export function usePokemons() {
  // ============================
  // 🔹 CACHE EM MEMÓRIA
  // ============================
  // Mantém os Pokémons carregados enquanto o app roda
  const cache = useRef(null);

  // ============================
  // 🔹 ESTADOS PRINCIPAIS
  // ============================
  const [allPokemons, setAllPokemons] = useState([]); // lista completa de Pokémons
  const [loading, setLoading] = useState(true);       // loading enquanto busca do backend

  // ============================
  // 🔹 PAGINAÇÃO
  // ============================
  const [page, setPage] = useState(1);   // página atual
  const [limit, setLimit] = useState(20); // itens por página

  // ============================
  // 🔹 FILTROS E BUSCA
  // ============================
  const [search, setSearch] = useState("");           // valor do input de busca
  const [debouncedSearch, setDebouncedSearch] = useState(""); // busca debounced
  const [type, setType] = useState("");               // filtro de tipo de Pokémon

  // ============================
  // 🔹 FETCH ÚNICO (BACKEND)
  // ============================
  useEffect(() => {
    async function load() {
      // Se já temos cache, não faz fetch
      if (cache.current) {
        setAllPokemons(cache.current);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPokemons(); // busca do backend
        cache.current = data;               // salva no cache
        setAllPokemons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
        setAllPokemons([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ============================
  // 🔹 DEBOUNCE DA BUSCA
  // ============================
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ============================
  // 🔹 FILTRO DEFENSIVO
  // ============================
  const filteredPokemons = useMemo(() => {
    let result = [...allPokemons];

    // Filtro por busca
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(
        p => p &&
          (p.name?.toLowerCase().includes(term) || String(p.id) === term)
      );
    }

    // Filtro por tipo
    if (type) {
      result = result.filter(p => Array.isArray(p.types) && p.types.includes(type));
    }

    return result;
  }, [allPokemons, debouncedSearch, type]);

  // ============================
  // 🔹 PAGINAÇÃO SEGURA
  // ============================
  const pagination = useMemo(() => {
    const total = filteredPokemons.length;                  // total de itens filtrados
    const totalPages = Math.max(Math.ceil(total / limit), 1); // total de páginas
    const safePage = Math.min(page, totalPages);            // garante página válida
    const start = (safePage - 1) * limit;                  // índice inicial do slice

    return {
      page: safePage,
      limit,
      total,
      totalPages,
      slice: filteredPokemons.slice(start, start + limit)  // Pokémons para a página atual
    };
  }, [filteredPokemons, page, limit]);

  // ============================
  // 🔹 RESET AUTOMÁTICO
  // ============================
  // Ao mudar busca, tipo ou limite, resetar para a página 1
  useEffect(() => setPage(1), [debouncedSearch, type, limit]);

  // ============================
  // 🔹 API DO HOOK
  // ============================
  return {
    pokemons: pagination.slice, // Pokémons a renderizar
    pagination,                 // informações da paginação
    loading,                     // loading state
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    type,
    setType
  };
}
