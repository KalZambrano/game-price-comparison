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
  const storeIds = [1, 2, 3, 7, 11, 15, 21, 27];

  useEffect(() => {
    loadStores();
    loadDeals();
  }, []);

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
      const allDeals: Record<number, Deal[]> = {};

      for (const storeId of storeIds) {
        const dealsData = await getDeals({
          storeID: storeId.toString(),
          pageSize: 7,
          desc: true,
        });
        allDeals[storeId] = dealsData;
      }

      setDealsByStore(allDeals);
    } catch (error) {
      console.error("Error loading deals:", error);
    }
  };

  // console.log(dealsByStore);

  return (
    <section className="py-40 md:py-24 w-4/6 mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
        <MdOutlineShoppingCart />
        Top Ofertas por Tienda
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {storeIds.map((storeId) => (
          <StoreCard
            key={storeId}
            storeIcon={getStoreBanner(stores, storeId.toString())}
            deals={dealsByStore[storeId] || []}
          />
        ))}
      </div>
      <footer className="mt-12 text-center text-gray-600">
        Muchas más tiendas y ofertas disponibles en la <a href="/" className="underline text-blue-600">página principal</a>.
      </footer>
    </section>
  );
}
