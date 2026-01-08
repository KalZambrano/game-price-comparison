import { type GameDetails } from "@/services/cheapshark";

export function DetailCard({ game }: { game: GameDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative flex justify-center items-center overflow-hidden">
        <img
          src={game.thumb}
          alt={game.external}
          className="h-40 bg-contain bg-center bg-no-repeat"
          loading="lazy"
        />
      </div>

      <div className="py-2 px-4 flex flex-col justify-between h-32">
        <div>
          <h3 className="font-bold text-lg line-clamp-2">
            {game.external}
          </h3>
          <p className="text-green-700 font-semibold">({game.cheapest} para arriba)</p>
        </div>

        <a
          href={`/game/?link=${game.gameID}`}
          target="_blank"
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Detalles
        </a>
      </div>
    </div>
  );
}
