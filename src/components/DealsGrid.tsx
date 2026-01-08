import React, { useState, useEffect } from 'react';
import { getDeals, getStores, getStoreIcon, getStoreName } from '../services/cheapshark';
import type { Deal, Store } from '../services/cheapshark';
import { GameCard } from './GameCard';
import { FilterBar } from './FilterBar';

export const DealsGrid: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState('');
  const [sortBy, setSortBy] = useState<string>('Deal Rating');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    loadDeals(true);
    setLoading(false);
  }, [selectedStore, sortBy]);

  const loadStores = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (error) {
      console.error('Error loading stores:', error);
    }
  };

  const loadDeals = async (reset = false, pageNumber?: number) => {
    setLoading(true);
    try {
      const currentPage = reset ? 0 : (pageNumber !== undefined ? pageNumber : page);
      const dealsData = await getDeals({
        storeID: selectedStore || undefined,
        sortBy: sortBy as any,
        pageSize: 20,
        pageNumber: currentPage,
        desc: true,
      });

      if (reset) {
        setDeals(dealsData);
        setPage(0);
      } else {
        setDeals((prev) => [...prev, ...dealsData]);
        setPage(currentPage);
      }

      setHasMore(dealsData.length === 20);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    loadDeals(false, nextPage);
  };

  

  // console.log('Deals:', deals);
  // console.log('Stores:', stores);

  return (
    <div>
      <FilterBar
        stores={stores}
        selectedStore={selectedStore}
        sortBy={sortBy}
        onStoreChange={setSelectedStore}
        onSortChange={setSortBy}
      />

      {loading && deals.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500">
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {deals.map((deal) => (
              <GameCard
                key={deal.dealID}
                deal={deal}
                storeName={getStoreName(stores, deal.storeID)}
                storeIcon={getStoreIcon(stores, deal.storeID)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Cargando...' : 'Cargar más'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
