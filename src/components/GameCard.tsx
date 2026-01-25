import type { Deal } from "../services/cheapshark";

interface GameCardProps {
  deal: Deal;
  storeName?: string;
  storeIcon?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  deal,
  storeName,
  storeIcon,
}) => {
  const savingsPercent = Math.round(parseFloat(deal.savings));
  const isOnSale = deal.isOnSale === "1";

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-blue-500/50">
      <div className="relative group">
        <div className="relative flex justify-center items-center overflow-hidden">
          <img
            src={deal.thumb}
            alt={deal.title}
            className="h-40 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/300x400/1a1a2e/e94560?text=Game+Image";
            }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
        </div>
        {isOnSale && savingsPercent > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            -{savingsPercent}% OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between min-h-[180px]">
        <div>
          <h3
            className="font-bold text-lg mb-2 text-white truncate leading-tight"
            title={deal.title}
          >
            {deal.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                ${deal.salePrice}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through">
                  ${deal.normalPrice}
                </span>
              )}
            </div>
            {storeIcon && (
              <div title={storeName} className="bg-gray-700 p-1 rounded-lg border border-gray-600">
                <img
                  src={`https://www.cheapshark.com/${storeIcon}`}
                  alt={`${storeName} logo`}
                  className="size-7 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {storeName && !storeIcon && (
            <div className="text-sm text-gray-400 mb-3">{storeName}</div>
          )}
        </div>

        <a
          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2.5 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 font-medium"
          aria-label={`Comprar ${deal.title} en CheapShark por $${deal.salePrice}`}
        >
          Ver oferta
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
};
