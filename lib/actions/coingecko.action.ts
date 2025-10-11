/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

/**
 * Search for cryptocurrencies using CoinGecko public API.
 * @param query The search string for the crypto asset.
 * @returns A promise that resolves to an array of StockWithWatchlistStatus-like objects for cryptos.
 */
export const searchCryptos = async (query?: string): Promise<StockWithWatchlistStatus[]> => {
  try {
    const trimmed = typeof query === "string" ? query.trim() : "";
    if (!trimmed) {
      // Return some popular cryptos if no query (BTC, ETH, etc)
      const popular = [
        { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
        { id: "ethereum", symbol: "ETH", name: "Ethereum" },
        { id: "solana", symbol: "SOL", name: "Solana" },
        { id: "binancecoin", symbol: "BNB", name: "Binance Coin" },
        { id: "ripple", symbol: "XRP", name: "Ripple" },
        { id: "cardano", symbol: "ADA", name: "Cardano" },
        { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
        { id: "polkadot", symbol: "DOT", name: "Polkadot" },
        { id: "matic-network", symbol: "MATIC", name: "Polygon" },
        { id: "litecoin", symbol: "LTC", name: "Litecoin" },
      ];
      return popular.map((c) => ({
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        exchange: "Crypto",
        type: "Crypto",
        isInWatchlist: false,
      }));
    }
    const url = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch from CoinGecko");
    const data = await res.json();
    const coins = Array.isArray(data?.coins) ? data.coins : [];
    return coins.slice(0, 15).map((coin: any) => ({
      symbol: (coin.symbol || "").toUpperCase(),
      name: coin.name || coin.id || coin.symbol,
      exchange: "Crypto",
      type: "Crypto",
      isInWatchlist: false,
    }));
  } catch (e) {
    console.error("Error in crypto search:", e);
    return [];
  }
};
