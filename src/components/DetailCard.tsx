import { type GameDetails } from "@/services/cheapshark";

export function DetailCard({ game }: { game: GameDetails }) {
  return (
    <a
      href={`/game/?link=${game.gameID}`}
      className=""
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative flex justify-center items-center overflow-hidden">
          <img
            src={game.thumb}
            alt={game.external}
            className="h-40 bg-contain bg-center bg-no-repeat"
            loading="lazy"
          />
        </div>

        <div className="py-2 px-4 flex flex-col justify-between h-20">
          <div>
            <h3 className="font-bold text-lg truncate" title={game.external}>{game.external}</h3>
            <p className="text-green-700 font-semibold">
              (${game.cheapest} para arriba)
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
