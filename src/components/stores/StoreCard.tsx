import type { Deal } from "@/services/cheapshark";
import DealSkeleton from "../skeleton/DealSkeleton";
import { useState } from "react";

export default function StoreCard({
  storeIcon,
  deals,
}: {
  storeIcon: string;
  deals: Deal[];
}) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    image: "",
    x: 0,
    y: 0,
  });

  return (
    <article>
      <div className="rounded-xl overflow-hidden shadow-lg bg-white border">
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <img
            src={`https://www.cheapshark.com` + storeIcon}
            alt="Logo de la tienda"
            aria-label="Icono de tienda"
          />
        </div>

        <ul className="text-sm">
          {deals.length === 0
            ? Array.from({ length: 7 }).map((_, i) => <DealSkeleton key={i} />)
            : deals.map((deal) => (
                <li
                  key={deal.dealID}
                  className="relative flex justify-between items-center hover:bg-blue-100 py-2 px-4"
                  onMouseEnter={(e) => {
                    setTooltip({
                      visible: true,
                      image: deal.thumb,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onMouseLeave={() =>
                    setTooltip((t) => ({ ...t, visible: false }))
                  }
                  onMouseMove={(e) =>
                    setTooltip((t) => ({
                      ...t,
                      x: e.clientX + 12,
                      y: e.clientY + 24,
                    }))
                  }
                >
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    className="underline truncate max-w-[60%] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${deal.title} por $${deal.salePrice}`}
                  >
                    {deal.title}
                  </a>

                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-400">
                      ${deal.normalPrice}
                    </span>
                    <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                      ${deal.salePrice}
                    </span>
                  </div>
                </li>
              ))}
        </ul>

        <div className="border-t mx-4"></div>
      </div>
      {tooltip.visible && (
        <img
          src={tooltip.image}
          className="fixed z-50 max-w-40 max-h-24 rounded shadow-lg pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x }}
          alt="Vista previa del juego"
          role="tooltip"
          aria-hidden="true"
        />
      )}
    </article>
  );
}
