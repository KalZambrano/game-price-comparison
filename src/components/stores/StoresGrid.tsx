import { useState, useEffect } from "react";
import StoreCard from "./StoreCard";
import { MdOutlineShoppingCart } from "react-icons/md";

import {
  getDeals,
  getStores,
  getStoreBanner,
  type Store,
  type Deal,
} from "@/services/cheapshark";

export default function StoresGrid() {
  const [stores, setStores] = useState<Store[]>([]);
  const [dealsByStore, setDealsByStore] = useState<Record<number, Deal[]>>({});
  const [loading, setLoading] = useState(true);

  const storeIds = [1, 2, 3, 7, 11, 15, 21, 27];

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);
      await Promise.all([loadStores(), loadDeals()]);
    } finally {
      setLoading(false);
    }
  };

  const loadStores = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (error) {
      console.error("Error loading stores:", error);
    }
  };

  const loadDeals = async () => {
    try {
      const dealsEntries = await Promise.all(
        storeIds.map(async (storeId) => {
          const deals = await getDeals({
            storeID: storeId.toString(),
            pageSize: 7,
            desc: true,
          });
          return [storeId, deals] as const;
        })
      );

      setDealsByStore(Object.fromEntries(dealsEntries));
    } catch (error) {
      console.error("Error loading deals:", error);
    }
  };

  return (
    <section className="py-32 md:py-24 w-11/12 xl:w-4/6 mx-auto mt-20 md:mt-8">
      {/* HEADER */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10 flex items-center justify-center gap-3 text-zinc-100">
        <MdOutlineShoppingCart className="text-indigo-400" />
        Top Ofertas por Tienda
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading
          ? storeIds.map((id) => (
              <div
                key={id}
                className="h-48 rounded-xl bg-zinc-800 animate-pulse border border-zinc-700"
              />
            ))
          : storeIds.map((storeId) => (
              <StoreCard
                key={storeId}
                storeIcon={getStoreBanner(stores, storeId.toString())}
                deals={dealsByStore[storeId] || []}
              />
            ))}
      </div>

      {/* FOOTER */}
      <footer className="mt-14 text-center text-sm text-zinc-400">
        Muchas más tiendas y ofertas disponibles en la{" "}
        <a
          href="/"
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition"
        >
          página principal
        </a>
        .
      </footer>
    </section>
  );
}
