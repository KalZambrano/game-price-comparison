import React, { useState } from 'react';
import { searchGames } from '../services/cheapshark';
import type { GameLookup } from '../services/cheapshark';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GameLookup[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
      setResults(games.slice(0, 8));
      setShowResults(true);
    } catch (error) {
      console.error('Error searching games:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-1/3 max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Buscar juegos..."
          className="w-full px-4 py-3 pl-12 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {loading && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {showResults && results.length > 0 && !loading && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {results.map((game) => (
            <a
              key={game.gameID}
              href={`/game/?link=${game.gameID}`}
              className="flex items-center p-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
              onClick={() => setShowResults(false)}
            >
              <img
                src={game.thumb}
                alt={game.external}
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{game.external}</h4>
                <p className="text-sm text-green-600 font-bold">
                  Desde ${game.cheapest}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg p-4 text-center text-gray-600">
          No se encontraron juegos
        </div>
      )}
    </div>
  );
};
