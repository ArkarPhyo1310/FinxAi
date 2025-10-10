export const NAV_ITEMS = [
  { href: "/", title: "Dashboard" },
  { href: "/search", title: "Search" },
  { href: "/watchlist", title: "Watchlist" },
];

export const INVESTMENT_GOALS = [
  { value: "Growth", label: "Growth" },
  { value: "Income", label: "Income" },
  { value: "Balanced", label: "Balanced" },
  { value: "Conservative", label: "Conservative" },
];

export const RISK_TOLERANCE_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const PREFERRED_INDUSTRIES = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Energy", label: "Energy" },
  { value: "Consumer Goods", label: "Consumer Goods" },
];

export const POPULAR_STOCK_SYMBOLS = [
  // Tech Giants (the big technology companies)
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "ORCL",
  "CRM",

  // Growing Tech Companies
  "ADBE",
  "INTC",
  "AMD",
  "PYPL",
  "UBER",
  "ZOOM",
  "SPOT",
  "SQ",
  "SHOP",
  "ROKU",

  // Newer Tech Companies
  "SNOW",
  "PLTR",
  "COIN",
  "RBLX",
  "DDOG",
  "CRWD",
  "NET",
  "OKTA",
  "TWLO",
  "ZM",

  // Consumer & Delivery Apps
  "DOCU",
  "PTON",
  "PINS",
  "SNAP",
  "LYFT",
  "DASH",
  "ABNB",
  "RIVN",
  "LCID",
  "NIO",

  // International Companies
  "XPEV",
  "LI",
  "BABA",
  "JD",
  "PDD",
  "TME",
  "BILI",
  "DIDI",
  "GRAB",
  "SE",
];

export const POPULAR_CRYPTO_SYMBOLS = [
  // Major Cryptocurrencies
  "BINANCE:BTCUSDT", // Bitcoin
  "BINANCE:ETHUSDT", // Ethereum
  "BINANCE:BNBUSDT", // Binance Coin
  "BINANCE:SOLUSDT", // Solana
  "BINANCE:XRPUSDT", // Ripple
  "BINANCE:ADAUSDT", // Cardano
  "BINANCE:DOGEUSDT", // Dogecoin
  "BINANCE:SHIBUSDT", // Shiba Inu
  "BINANCE:DOTUSDT", // Polkadot
  "BINANCE:AVAXUSDT", // Avalanche

  // Other Popular Cryptocurrencies
  "BINANCE:LINKUSDT", // Chainlink
  "BINANCE:LTCUSDT", // Litecoin
  "BINANCE:BCHUSDT", // Bitcoin Cash
  "BINANCE:TRXUSDT", // Tron
  "BINANCE:MATICUSDT", // Polygon
  "BINANCE:UNIUSDT", // Uniswap
  "BINANCE:ICPUSDT", // Internet Computer
  "BINANCE:ETCUSDT", // Ethereum Classic
  "BINANCE:XLMUSDT", // Stellar
  "BINANCE:VETUSDT", // VeChain
];
