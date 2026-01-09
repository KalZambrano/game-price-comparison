import React from 'react';
import type { Store } from '../services/cheapshark';

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
  const activeStores = stores.filter(store => store.isActive === 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="region" aria-label="Filtros de búsqueda">
        <div>
          <label htmlFor="store-select" className="block text-sm font-medium text-gray-700 mb-2">
            Tienda
          </label>
          <select
            id="store-select"
            value={selectedStore}
            onChange={(e) => onStoreChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

        <div>
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
