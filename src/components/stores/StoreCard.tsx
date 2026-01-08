import type { Deal } from "@/services/cheapshark";

export default function StoreCard({
  storeIcon,
  deals,
}: {
  storeIcon: string;
  deals: Deal[];
}) {
  return (
    <article>
      <div className="rounded-xl overflow-hidden shadow-lg bg-white border">
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <img src={`https://www.cheapshark.com` + storeIcon} alt="Banner Icon" />
        </div>

        <ul className="p-4 space-y-3 text-sm">
          {deals.map((deal) => {
            return (
              <li className="flex justify-between items-center">
                <a href="/" className="underline truncate w-2/3">
                  {deal.title}
                </a>
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400">${deal.normalPrice}</span>
                  <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    ${deal.salePrice}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t mx-4"></div>
      </div>
    </article>
  );
}
