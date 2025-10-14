"use client";

import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Hero = () => {
  const router = useRouter();

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const [demoLoading, setDemoLoading] = useState(false);
  const handleDemo = async () => {
    setDemoLoading(true);
    const data: SignInFormData = {
      email: "demo@finxai.app",
      password: "Demo@123",
    };

    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/stocks");
      else toast.error("Demo sign-in failed!", { description: result.error });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Demo sign-in failed!", {
        description: error instanceof Error ? error.message : "Failed to sign in.",
      });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-5 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm mb-8">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-slate-700">AI-Powered Market Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Welcome to{" "}
            <span className="inline-block">
              <span style={{ color: "#0EA5E9" }}>Fin</span>
              <span style={{ color: "#EF4444" }}>x</span>
              <span style={{ color: "#0EA5E9" }}>AI</span>
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed">
          Your intelligent partner for navigating the complexities of the stock and crypto markets. Empowering investors
          with real-time data, AI-driven insights, and personalized tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group"
            onClick={scrollToFeatures}
          >
            Explore FinxAI
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            type="button"
            variant="secondary"
            disabled={demoLoading}
            className="px-8 py-6 text-lg group"
            onClick={handleDemo}
          >
            {demoLoading ? "Starting Demo..." : "Try Demo"}
          </Button>
        </div>

        {/* Floating chart preview */}
        <div className="mt-20 relative">
          <Image
            src="/assets/images/dashboard-preview.png"
            alt="dashboard-preview"
            width={2616}
            height={1356}
            className="rounded-2xl shadow-2xl border border-slate-200/50 max-w-4xl mx-auto text-white/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
