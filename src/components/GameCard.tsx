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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative flex justify-center items-center overflow-hidden">
        <img
          src={deal.thumb}
          alt={deal.title}
          className="h-40 bg-contain bg-center bg-no-repeat"
          loading="lazy"
        />
        {isOnSale && savingsPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            -{savingsPercent}%
          </div>
        )}
      </div>

      <div className="py-2 px-4 flex flex-col justify-between h-48">
        <div>
          <h3 className="font-bold text-base md:text-lg mb-2 truncate" title={deal.title}>
            {deal.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-green-600">
                ${deal.salePrice}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-500 line-through">
                  ${deal.normalPrice}
                </span>
              )}
            </div>
          </div>

          {storeName && (
            <div className="text-sm text-gray-600 mb-3 flex items-center">
              <span className="font-semibold">
                {storeIcon && (
                  <img
                    src={`https://www.cheapshark.com/` + storeIcon}
                    alt={`Icono de la tienda ` + storeName}
                    className="inline-block mr-1 size-6"
                  />
                )}
              </span>{" "}
              {storeName}
            </div>
          )}
        </div>

        <a
          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={`Comprar ${deal.title} en CheapShark por $${deal.salePrice}`}
        >
          Comprar
        </a>
      </div>
    </div>
  );
};
