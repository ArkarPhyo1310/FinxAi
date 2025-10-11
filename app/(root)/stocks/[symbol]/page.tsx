import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/stocksConfig";

const StockDetails = async ({ params }: StockDetailsPageProps) => {
  const symbol = (await params).symbol;
  const scriptUrlBase =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto py-8">
      {/* Left Column */}
      <section className="flex flex-col gap-6">
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}symbol-info.js`}
          config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
        />
      </section>
      {/* Right Column */}
      <section className="flex flex-col gap-6">
        <WatchlistButton symbol={symbol} />
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}technical-analysis.js`}
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}symbol-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          scriptUrl={`${scriptUrlBase}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
        />
      </section>
    </div>
  );
};

export default StockDetails;
