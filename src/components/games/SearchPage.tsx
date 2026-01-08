import {
  getStoreIcon,
  getStoreName,
  searchGames,
  getStores,
  type Deal,
  type Store,
  type GameDetails,
} from "@/services/cheapshark";
import { useState, useEffect } from "react";
import { DetailCard } from "../DetailCard";

export default function SearchPage() {
  const [query, setQuery] = useState<string | null>("");
  const [results, setResults] = useState<GameDetails[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setQuery(urlParams.get("query"));
  }, []);

  const loadStores = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (error) {
      console.error("Error loading stores:", error);
    }
  };

  useEffect(() => {
    // let mounted = true;

    (async () => {
      try {
      const games = await searchGames(query || "");
      setResults(games);
    } catch (error) {
      console.error("Error searching games:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
    })();
  }, []);
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const games = await searchGames(searchQuery);
      setResults(games);
    } catch (error) {
      console.error("Error searching games:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("Query:", query);
  console.log("Results:", results);
  return (
    <div className="min-h-screen bg-gray-50 py-20 w-5/6 mx-auto">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda</h1>
        {/* <input
          type="text"
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => handleSearch(query)}>Buscar</button> */}
      </div>
      {results.length > 0 ? (
        <div className="container mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((game) => (
            <DetailCard key={game.gameID} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-gray-800 font-semibold mt-10">
          <span>No se encontraron resultados</span>
        </div>
      )}
    </div>
  );
}
