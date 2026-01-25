import { type GameDetails } from "@/services/cheapshark";

export function DetailCard({ game }: { game: GameDetails }) {
  return (
    <a
      href={`/game/?link=${game.gameID}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl transition-all duration-200 hover:-translate-y-1"
      aria-label={`Ver detalles de ${game.external} desde $${game.cheapest}`}
    >
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden hover:shadow-2xl hover:border-gray-600/70 transition-all duration-300">
        <div className="relative flex justify-center items-center overflow-hidden">
          <img
            src={game.thumb}
            alt={`Portada de ${game.external}`}
            className="h-40 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/300x400/1a1a2e/e94560?text=Game+Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4">
          <h3
            className="font-bold text-lg text-white truncate mb-1 group-hover:text-blue-400 transition-colors"
            title={game.external}
          >
            {game.external}
          </h3>
          <div className="flex items-center">
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Desde ${game.cheapest}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
