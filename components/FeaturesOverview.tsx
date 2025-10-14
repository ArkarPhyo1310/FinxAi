import FeatureCard from "./FeatureCard";
import { Activity, Brain, List, Bell } from "lucide-react";

const FeaturesOverview = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-Time Data",
      description:
        "Access live market data for stocks and cryptocurrencies with millisecond precision. Stay ahead with instant updates on price movements, volume changes, and market trends.",
    },
    {
      icon: Brain,
      title: "AI-Driven Insights",
      description:
        "Leverage cutting-edge artificial intelligence to analyze market patterns, predict trends, and receive personalized investment recommendations tailored to your portfolio.",
    },
    {
      icon: List,
      title: "Personalized Watchlists",
      description:
        "Create and manage custom watchlists to track your favorite assets. Organize by sector, performance, or custom criteria for efficient portfolio monitoring.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Set intelligent price alerts, volume triggers, and custom notifications. Never miss an important market movement with our advanced alert system.",
    },
  ];

  return (
    <div id="features" className="pt-44 mb-10 px-6 w-full">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-6 text-slate-400">Powerful Features at Your Fingertips</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to make informed investment decisions in today&apos;s fast-paced markets
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;
