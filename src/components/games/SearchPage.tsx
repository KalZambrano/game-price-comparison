import { searchGames, type GameDetails } from "@/services/cheapshark";
import { useState, useEffect } from "react";
import { DetailCard } from "../DetailCard";
import { FaChevronLeft } from "react-icons/fa";

export default function SearchPage() {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<GameDetails[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setQuery(urlParams.get("query"));
  }, []);

  useEffect(() => {
    // let mounted = true;
    if (!query) return;

    setLoading(true);

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
  }, [query]);

  // console.log("Query:", query);
  // console.log("Results:", results);

  const totalResults = results.length;
  return (
    <section className="py-16 md:py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors group mt-32 md:mt-20 mb-6 md:mb-8"
        >
          <div className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2.5 flex items-center group-hover:border-blue-500/50 transition-all duration-300">
            <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al inicio</span>
          </div>
        </a>
      {loading ? (
        <article className="min-h-[60vh] grid place-content-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-blue-500"></div>
            <p className="text-gray-400">Buscando juegos...</p>
          </div>
        </article>
      ) : (
        <article className="max-w-7xl mx-auto w-full">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <span className="text-gray-400 text-sm">Resultados de búsqueda para:</span>
              <h1 className="text-3xl font-bold text-white mb-2">"{query}"</h1>
              <p className="text-gray-400">{totalResults} {totalResults === 1 ? 'resultado' : 'resultados'} encontrados</p>
            </div>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((game) => (
                  <DetailCard key={game.gameID} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
                  <p className="text-gray-400">No hay juegos que coincidan con tu búsqueda.</p>
                  <a 
                    href="/" 
                    className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaChevronLeft className="mr-2" />
                    Volver al inicio
                  </a>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
      </div>
    </section>
  );
}
