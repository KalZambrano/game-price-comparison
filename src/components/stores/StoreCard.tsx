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
      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
        {/* HEADER */}
        <div className="bg-zinc-800 px-4 py-3 flex items-center gap-2">
          <img
            src={`https://www.cheapshark.com${storeIcon}`}
            alt="Logo de la tienda"
            aria-label="Icono de tienda"
            className="h-6 object-contain"
          />
        </div>

        {/* LIST */}
        <ul className="text-sm divide-y divide-zinc-800">
          {deals.length === 0
            ? Array.from({ length: 7 }).map((_, i) => (
                <DealSkeleton key={i} />
              ))
            : deals.map((deal) => (
                <li
                  key={deal.dealID}
                  className="
                    relative flex justify-between items-center
                    py-2 px-4
                    hover:bg-zinc-800/70
                    transition-colors
                  "
                  onMouseEnter={(e) => {
                    setTooltip({
                      visible: true,
                      image: deal.thumb,
                      x: e.clientX + 12,
                      y: e.clientY + 24,
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
                  {/* TITLE */}
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    className="
                      truncate max-w-[60%]
                      text-zinc-200 hover:text-indigo-400
                      underline-offset-4 hover:underline
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      rounded px-1 transition
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${deal.title} por $${deal.salePrice}`}
                  >
                    {deal.title}
                  </a>

                  {/* PRICE */}
                  <div className="flex items-center gap-2">
                    <span className="line-through text-zinc-500 text-xs">
                      ${deal.normalPrice}
                    </span>
                    <span className="bg-indigo-500/90 text-white px-2 py-1 rounded-md text-xs font-semibold w-12 text-center">
                      ${deal.salePrice}
                    </span>
                  </div>
                </li>
              ))}
        </ul>

        <div className="border-t border-zinc-800 mx-4" />
      </div>

      {/* TOOLTIP */}
      {tooltip.visible && (
        <img
          src={tooltip.image}
          className="
            fixed z-50 max-w-40 max-h-24
            rounded-lg shadow-xl
            pointer-events-none
            border border-zinc-700
            bg-zinc-900
          "
          style={{ top: tooltip.y, left: tooltip.x }}
          alt="Vista previa del juego"
          role="tooltip"
          aria-hidden="true"
        />
      )}
    </article>
  );
}
