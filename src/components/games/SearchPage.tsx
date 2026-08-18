import { searchGames, type GameDetails } from "@/services/cheapshark";
import { useState, useEffect } from "react";
import { DetailCard } from "../DetailCard";
import { FaChevronLeft, FaSearch } from "react-icons/fa";

export default function SearchPage() {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<GameDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setQuery(urlParams.get("query"));
  }, []);

  useEffect(() => {
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

  const totalResults = results.length;

  return (
    <section className="py-16 md:py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors group mb-6 md:mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
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
        ) : totalResults > 0 ? (
          <article className="w-full">
            <header className="mb-8 md:mb-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-blue-400">
                    <FaSearch className="text-[0.7rem]" aria-hidden="true" />
                    Resultados de búsqueda para
                  </span>
                  <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white truncate">
                    "{query}"
                  </h1>
                </div>

                <p className="shrink-0 inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-gray-700/60 bg-gray-900/60 px-4 py-1.5 text-sm text-gray-300">
                  <span className="font-semibold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                    {totalResults}
                  </span>
                  {totalResults === 1
                    ? "resultado encontrado"
                    : "resultados encontrados"}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {results.map((game) => (
                <DetailCard key={game.gameID} game={game} />
              ))}
            </div>
          </article>
        ) : (
          <article className="min-h-[50vh] grid place-content-center py-12">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 md:p-10 max-w-xl mx-auto text-center shadow-lg">
              <div className="mx-auto mb-6 grid place-content-center h-16 w-16 rounded-full bg-gray-900/70 border border-gray-700/60 text-blue-400">
                <FaSearch className="text-2xl" aria-hidden="true" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                No se encontraron resultados
              </h1>
              <p className="text-gray-400">
                No hay juegos que coincidan con tu búsqueda. Prueba con otro
                nombre o revisa la ortografía.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <FaChevronLeft className="mr-2" />
                Volver al inicio
              </a>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
