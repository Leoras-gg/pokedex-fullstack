import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";

export function usePokemons() {
  const cache = useRef(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    async function load() {
      if (cache.current) {
        setAllPokemons(cache.current);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPokemons();
        cache.current = data;
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

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredPokemons = useMemo(() => {
    let result = [...allPokemons];

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(
        p => p &&
          (p.name?.toLowerCase().includes(term) || String(p.id) === term)
      );
    }

    if (type) {
      result = result.filter(p => Array.isArray(p.types) && p.types.includes(type));
    }

    return result;
  }, [allPokemons, debouncedSearch, type]);

  const pagination = useMemo(() => {
    const total = filteredPokemons.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;

    return {
      page: safePage,
      limit,
      total,
      totalPages,
      slice: filteredPokemons.slice(start, start + limit)
    };
  }, [filteredPokemons, page, limit]);

  useEffect(() => setPage(1), [debouncedSearch, type, limit]);

  return {
    pokemons: pagination.slice,
    pagination,
    loading,
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
