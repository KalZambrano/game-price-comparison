import React, { useState } from "react";
import { searchGames } from "../services/cheapshark";
import type { GameLookup } from "../services/cheapshark";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GameLookup[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const games = await searchGames(searchQuery);
      setResults(games.slice(0, 4));
      setShowResults(true);
    } catch (error) {
      console.error("Error searching games:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const q = query.trim();

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="game-search"
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (q.length >= 2) {
                  window.location.href = `/search/?query=${encodeURIComponent(q)}`;
                }
              }
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowResults(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
            placeholder="Buscar juegos..."
            aria-autocomplete="list"
            aria-controls="game-suggestions"
            aria-expanded={showResults && results.length > 0}
            className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={() => {
            if (q.length >= 2) {
              window.location.href = `/search/?query=${encodeURIComponent(q)}`;
            }
          }}
          aria-label="Buscar juegos"
          title="Buscar juegos"
          disabled={q.length < 2}
          className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {showResults && results.length > 0 && isFocused && (
        <div
          id="game-suggestions"
          className="absolute right-0 top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50 backdrop-blur-lg bg-opacity-95"
          role="listbox"
          aria-label="Sugerencias de juegos"
        >
          {results.map((game) => (
            <a
              key={game.gameID}
              href={`/game/?link=${game.gameID}`}
              className="flex items-center p-3 hover:bg-gray-700/80 cursor-pointer transition-colors duration-150 border-b border-gray-700 last:border-b-0"
              role="option"
            >
              <img
                src={game.thumb}
                alt={`Portada de ${game.external}`}
                className="w-20 h-8 md:w-40 md:h-16 object-cover rounded-sm mr-3"
              />
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-white">{game.external}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-full">
                    ${game.cheapest}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && query.length >= 2 && isFocused && (
        <div 
          className="absolute top-full mt-2 w-full bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-4 text-center text-gray-300" 
          role="status" 
          aria-live="polite" 
          aria-label="Resultado de búsqueda"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Buscando juegos...</span>
            </div>
          ) : (
            'No se encontraron resultados para tu búsqueda'
          )}
        </div>
      )}
    </div>
  );
};
