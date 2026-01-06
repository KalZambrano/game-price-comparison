import React from 'react';
import type { Deal } from '../services/cheapshark';

interface GameCardProps {
  deal: Deal;
  storeName?: string;
}

export const GameCard: React.FC<GameCardProps> = ({ deal, storeName }) => {
  const savingsPercent = Math.round(parseFloat(deal.savings));
  const isOnSale = deal.isOnSale === '1';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={deal.thumb} 
          alt={deal.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {isOnSale && savingsPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            -{savingsPercent}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {deal.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-600">
              ${deal.salePrice}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                ${deal.normalPrice}
              </span>
            )}
          </div>
          
          {deal.metacriticScore && parseInt(deal.metacriticScore) > 0 && (
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white ${
                parseInt(deal.metacriticScore) >= 75 ? 'bg-green-500' :
                parseInt(deal.metacriticScore) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {deal.metacriticScore}
              </div>
              <span className="text-xs text-gray-600 mt-1">Metacritic</span>
            </div>
          )}
        </div>

        {deal.steamRatingPercent && parseInt(deal.steamRatingPercent) > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Steam Rating</span>
              <span className="font-semibold">{deal.steamRatingPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${deal.steamRatingPercent}%` }}
              />
            </div>
          </div>
        )}

        {storeName && (
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-semibold">Tienda:</span> {storeName}
          </div>
        )}

        <a
          href={`/game/${deal.gameID}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Detalles
        </a>
      </div>
    </div>
  );
};
