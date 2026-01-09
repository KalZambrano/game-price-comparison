// API Service para CheapShark
const BASE_URL = 'https://www.cheapshark.com/api/1.0';

export interface Deal {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface Store {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

export interface GameDetails {
  gameID: string;
  steamAppID: string;
  cheapest: string;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}


export interface GameInfo {
  info: {
    title: string;
    steamAppID: string;
    thumb: string;
  };
  deals: Array<{
    storeID: string;
    dealID: string;
    price: string;
    retailPrice: string;
    savings: string;
  }>;
  cheapestPriceEver: {
    price: string;
    date: number;
  };
}

export interface GameLookup {
  gameID: string;
  steamAppID: string;
  cheapest: string;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}

// Obtener todas las tiendas
export async function getStores(): Promise<Store[]> {
  const response = await fetch(`${BASE_URL}/stores`);
  return response.json();
}

// Obtener ofertas con filtros opcionales
export async function getDeals(params?: {
  storeID?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: 'Deal Rating' | 'Title' | 'Savings' | 'Price' | 'Metacritic' | 'Reviews' | 'Release' | 'Store' | 'recent';
  desc?: boolean;
  lowerPrice?: number;
  upperPrice?: number;
  metacritic?: number;
  steamRating?: number;
  onSale?: boolean;
}): Promise<Deal[]> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
  }

  const response = await fetch(`${BASE_URL}/deals?${searchParams}`);
  // console.log(searchParams.toString())
  return response.json();
}

// Buscar juegos por título
export async function searchGames(title: string): Promise<GameLookup[]> {
  const response = await fetch(`${BASE_URL}/games?title=${encodeURIComponent(title)}`);
  return response.json();
}

// Obtener información detallada de un juego
export async function getGameInfo(gameID: string): Promise<GameInfo> {
  const response = await fetch(`${BASE_URL}/games?id=${gameID}`);
  return response.json();
}

export const getStoreName = (stores: Store[], storeID: string) => {
  const store = stores.find((s) => s.storeID === storeID);
  return store?.storeName || 'Unknown Store';
};

export const getStoreIcon = (stores: Store[], storeID: string) => {
  const store = stores.find((s) => s.storeID === storeID);
  return store?.images?.logo || '';
}

export const getStoreBanner = (stores: Store[], storeID: string) => {
  const store = stores.find((s) => s.storeID === storeID);
  return store?.images?.banner || '';
}
