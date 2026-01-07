import { useState, useEffect } from "react";
import { getGameInfo, getStores } from "@/services/cheapshark";
import type { GameInfo, Store } from "@/services/cheapshark";

export default function GamesPage() {
  const [id, setId] = useState<string | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setId(urlParams.get("link"));
  }, []);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const [gi, st] = await Promise.all([getGameInfo(id), getStores()]);
        if (!mounted) return;
        setGameInfo(gi);
        setStores(st);
      } catch (e) {
        console.error("Error loading game info:", e);
        if (!mounted) return;
        setError(true);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const getStoreName = (storeID: string) => {
    const store = stores.find((s) => s.storeID === storeID);
    return store?.storeName || "Unknown Store";
  };

  const getStoreImage = (storeID: string) => {
    const store = stores.find((s) => s.storeID === storeID);
    return store?.images?.logo || "";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 grid place-content-center">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  console.log(gameInfo);
  console.log(stores);

  return (
    <>
      {error || !gameInfo ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Juego no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            No pudimos encontrar información sobre este juego.
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Volver al inicio
          </a>
        </div>
      ) : (
        <>
          {/* <!-- Hero Section --> */}
          <section className="mt-28 mb-12 mx-auto w-5/6 flex flex-col md:flex-row gap-8 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-center py-4">
                <img
                  src={gameInfo.info.thumb}
                  alt={gameInfo.info.title}
                  className="w-full md:w-64 h-auto rounded-lg shadow-2xl"
                />
                <div className="flex-1 justify-center flex flex-col ">
                  <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center lg:text-left">
                    {gameInfo.info.title}
                  </h1>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      💰 Precio Histórico Más Bajo
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-green-600">
                        ${gameInfo.cheapestPriceEver.price}
                      </span>
                      <span className="text-gray-600">
                        el {formatDate(gameInfo.cheapestPriceEver.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Stats Section --> */}
          <section className="container mx-auto px-4 pb-12 w-5/6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              🏪 Comparación de Precios por Tienda
            </h2>

            {gameInfo.deals.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600 text-lg">
                  No hay ofertas disponibles en este momento.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gameInfo.deals
                  .slice()
                  .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                  .map((deal) => {
                    const savings = parseFloat(deal.savings);
                    const storeName = getStoreName(deal.storeID);
                    const storeImage = getStoreImage(deal.storeID);

                    return (
                      <div
                        key={deal.dealID}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow flex justify-between flex-col"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4 flex-wrap">
                            <span className="flex gap-x-2">
                              <img
                                src={`https://www.cheapshark.com/${storeImage}`}
                                alt={storeName}
                                className="w-8 h-8 mr-2"
                              />
                              <label className="font-bold text-lg">
                                {storeName}
                              </label>
                            </span>
                            {savings > 0 && (
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -{Math.round(savings)}%
                              </span>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                              ${deal.price}
                            </div>
                            {savings > 0 && (
                              <div className="text-gray-500 line-through">
                                ${deal.retailPrice}
                              </div>
                            )}
                          </div>

                          {savings > 0 && (
                            <div className="mb-4 text-sm text-gray-600">
                              Ahorras $
                              {(
                                parseFloat(deal.retailPrice) -
                                parseFloat(deal.price)
                              ).toFixed(2)}
                            </div>
                          )}
                        </div>

                        <a
                          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Comprar Ahora
                        </a>
                      </div>
                    );
                  })}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
