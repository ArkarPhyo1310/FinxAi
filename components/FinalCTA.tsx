import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  const benefits = [
    "No credit card required",
    "Access to all features",
    "Real-time market data",
    "AI-powered insights",
  ];

  return (
    <div className="w-full overflow-hidden glass-effect py-10">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl mb-6 text-white">Ready to Transform Your Investing?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
            Join FinxAI today and gain the edge you need in the dynamic world of stocks and cryptocurrencies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href={"/sign-up"}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-sm group shadow-xl">
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-cyan-200" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
