import FeaturesOverview from "@/components/FeaturesOverview";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="flex home-wrapper">
      <Hero />
      <FeaturesOverview />
      <FinalCTA />
    </div>
  );
};

export default Home;
