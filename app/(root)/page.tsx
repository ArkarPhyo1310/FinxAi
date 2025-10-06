import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
} from "@/lib/stocksConfig";

const Home = () => {
  const scriptUrlBase =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="flex home-wrapper h-screen">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrlBase}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrlBase}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            scriptUrl={`${scriptUrlBase}timeline.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrlBase}market-quotes.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
