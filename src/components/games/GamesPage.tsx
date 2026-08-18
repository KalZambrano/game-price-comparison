import { useState, useEffect } from "react";
import { getGameInfo, getStores } from "@/services/cheapshark";
import type { GameInfo, Store } from "@/services/cheapshark";
import { TbRosetteDiscount, TbRosetteDiscountOff } from "react-icons/tb";
import { FaChevronLeft } from "react-icons/fa";

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
      <article className="min-h-[60vh] grid place-content-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-blue-500"></div>
          <p className="text-gray-400">Cargando información del juego...</p>
        </div>
      </article>
    );
  }

  // console.log(gameInfo);
  // console.log(stores);

  const dealsWithDiscount =
    gameInfo?.deals.filter((deal) => parseFloat(deal.savings) > 0) || [];
  const dealsWithoutDiscount =
    gameInfo?.deals.filter((deal) => parseFloat(deal.savings) === 0) || [];

  return (
    <>
      {error || !gameInfo ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">
              Juego no encontrado
            </h1>
            <p className="text-gray-300 mb-8">
              No pudimos encontrar información sobre este juego. El enlace puede
              ser incorrecto o el juego puede no estar disponible actualmente.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaChevronLeft className="mr-2" />
              Volver al inicio
            </a>
          </div>
        </div>
      ) : (
        <div className="py-8 md:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <a
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors group mb-6 md:mb-8"
            >
              <div className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2.5 flex items-center group-hover:border-blue-500/50 transition-all duration-300">
                <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al inicio</span>
              </div>
            </a>
            {/* <!-- Hero Section --> */}
            <section className="mb-12 mx-auto w-full max-w-7xl px-4">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <img
                    src={gameInfo.info.thumb}
                    alt={gameInfo.info.title}
                    className="w-full max-w-xs rounded-xl shadow-2xl transition-transform hover:scale-105 duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/300x400/1f2937/9ca3af?text=No+Image";
                    }}
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                      {gameInfo.info.title}
                    </h1>
                    <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                      <h2 className="text-xl font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        💰 Precio Histórico Más Bajo
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <span className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                          ${gameInfo.cheapestPriceEver.price}
                        </span>
                        <span className="text-gray-400">
                          Registrado el{" "}
                          {formatDate(gameInfo.cheapestPriceEver.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- Stats Section --> */}
            <section className="container mx-auto px-4 pb-12 max-w-7xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <TbRosetteDiscount className="text-yellow-400" /> Descuentos
                Disponibles
              </h2>

              {dealsWithDiscount.length === 0 ? (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 text-center">
                  <p className="text-gray-300 text-lg">
                    No hay ofertas con descuento disponibles en este momento.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                  {dealsWithDiscount
                    .slice()
                    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    .map((deal) => {
                      const savings = parseFloat(deal.savings);
                      const storeName = getStoreName(deal.storeID);
                      const storeImage = getStoreImage(deal.storeID);

                      return (
                        <div
                          key={deal.dealID}
                          className="group h-full flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-blue-500/40 hover:bg-gray-800/70 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                        >
                          {/* Cabecera: tienda */}
                          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-gray-700/50">
                            <img
                              src={`https://www.cheapshark.com/${storeImage}`}
                              alt={storeName}
                              title={storeName}
                              className="w-9 h-9 shrink-0 rounded-full bg-gray-700 p-1.5 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://via.placeholder.com/32/1f2937/9ca3af?text=ST";
                              }}
                            />
                            <span
                              title={storeName}
                              className="font-semibold text-gray-200 text-sm truncate"
                            >
                              {storeName}
                            </span>
                          </div>

                          {/* Precio + descuento */}
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent leading-none">
                              ${deal.price}
                            </span>
                            <span className="shrink-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                              -{Math.round(savings)}%
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <span className="text-gray-500 line-through">
                              ${deal.retailPrice}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400">
                              Ahorras{" "}
                              <span className="font-semibold text-green-400">
                                $
                                {(
                                  parseFloat(deal.retailPrice) -
                                  parseFloat(deal.price)
                                ).toFixed(2)}
                              </span>
                            </span>
                          </div>

                          <a
                            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Comprar ${gameInfo.info.title} en ${storeName} por $${deal.price}`}
                            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-center py-3 rounded-lg transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                            Comprar Ahora
                          </a>
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
            <section className="mb-12 mx-auto max-w-7xl px-4">
              {dealsWithoutDiscount.length > 0 && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <TbRosetteDiscountOff className="text-gray-400" /> Tiendas a
                  Precio Regular
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                {dealsWithoutDiscount.map((deal) => {
                  const storeName = getStoreName(deal.storeID);
                  const storeImage = getStoreImage(deal.storeID);

                  return (
                    <article
                      key={deal.dealID}
                      aria-label={`Ver ${gameInfo.info.title} en ${storeName} por $${deal.price}`}
                      className="group h-full flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-gray-500/70 hover:bg-gray-800/70 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-gray-700/50">
                        <img
                          src={`https://www.cheapshark.com/${storeImage}`}
                          alt={storeName}
                          title={storeName}
                          className="w-9 h-9 shrink-0 rounded-full bg-gray-700 p-1.5 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://via.placeholder.com/32/1f2937/9ca3af?text=ST";
                          }}
                        />
                        <span
                          title={storeName}
                          className="font-semibold text-gray-200 text-sm truncate"
                        >
                          {storeName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-200 leading-none">
                          ${deal.price}
                        </span>
                        <span className="shrink-0 bg-gray-700/70 text-gray-300 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          Precio regular
                        </span>
                      </div>

                      <a
                        href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 w-full text-center py-3 rounded-lg border border-gray-600/70 text-gray-300 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300 font-medium"
                      >
                        Ver en tienda
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
