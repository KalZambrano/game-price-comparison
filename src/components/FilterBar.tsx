import React from "react";
import type { Store } from "../services/cheapshark";

interface FilterBarProps {
  stores: Store[];
  selectedStore: string;
  sortBy: string;
  onStoreChange: (storeId: string) => void;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  stores,
  selectedStore,
  sortBy,
  onStoreChange,
  onSortChange,
}) => {
  const activeStores = stores.filter((store) => store.isActive === 1);

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-xl p-5 mb-8 transition-all duration-300 hover:shadow-2xl hover:border-gray-600/50">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="region"
        aria-label="Filtros de búsqueda"
      >
        {/* TIENDA */}
        <div>
          <label
            htmlFor="store-select"
            className="block text-sm font-semibold text-gray-100 mb-2.5"
          >
            Tienda
          </label>
          <select
            id="store-select"
            value={selectedStore}
            onChange={(e) => onStoreChange(e.target.value)}
            className="
              w-full px-4 py-2.5 rounded-xl
              bg-gray-800/80 text-gray-100
              border border-gray-700/70
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-1 focus:ring-offset-gray-900
              transition-all duration-200 ease-in-out
              hover:bg-gray-800/90 hover:border-gray-600/80
              cursor-pointer
            "
            aria-label="Seleccionar tienda"
          >
            <option value="">Todas las tiendas</option>
            {activeStores.map((store) => (
              <option key={store.storeID} value={store.storeID}>
                {store.storeName}
              </option>
            ))}
          </select>
        </div>

        {/* ORDEN */}
        <div>
          <label
            htmlFor="sort-select"
            className="block text-sm font-semibold text-gray-100 mb-2.5"
          >
            Ordenar por
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              w-full px-4 py-2.5 rounded-xl
              bg-gray-800/80 text-gray-100
              border border-gray-700/70
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-1 focus:ring-offset-gray-900
              transition-all duration-200 ease-in-out
              hover:bg-gray-800/90 hover:border-gray-600/80
              cursor-pointer
            "
            aria-label="Ordenar por criterio"
          >
            <option value="Deal Rating">Mejor oferta</option>
            <option value="Savings">Mayor descuento</option>
            <option value="Price">Precio más bajo</option>
            <option value="Release">Más reciente</option>
            <option value="Title">Título A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};
