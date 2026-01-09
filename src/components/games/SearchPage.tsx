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
    <section className="py-40 md:py-24">
      <a
        href="/"
        className="absolute top-40 md:top-24 left-6 hover:underline hover:text-blue-400 transition-colors flex items-center"
      >
        <FaChevronLeft className="inline-block mr-2" />
        Volver al inicio
      </a>
      {loading ? (
        <article className="min-h-screen bg-gray-50 grid place-content-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
        </article>
      ) : (
        <article>
          <div className="min-h-screen bg-gray-50 w-5/6 mx-auto mt-8">
            <div className="container mx-auto px-4">
              <span>Resultados de "{query}"</span>
              <h1 className="text-3xl font-bold mb-6">
                {totalResults} resultados encontrados
              </h1>
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
        </article>
      )}
    </section>
  );
}
