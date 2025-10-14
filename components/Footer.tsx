"use client";

import { useEffect, useState } from "react";

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isReachBottom, setIsReachBottom] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);

      const scrolledTo = window.scrollY + window.innerHeight;
      const threshold = 300;
      const isReach = document.body.scrollHeight - threshold <= scrolledTo;
      setIsReachBottom(isReach);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <footer
      className={`container glass-effect fixed left-0 right-0 bg-slate-900/95 text-slate-300 py-4 px-6 z-40 transition-transform duration-300 ${
        isScrolling || isReachBottom ? "bottom-3 translate-y-0" : "bottom-0 translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-xl">
          <span style={{ color: "#0EA5E9" }}>Fin</span>
          <span style={{ color: "#EF4444" }}>x</span>
          <span style={{ color: "#0EA5E9" }}>AI</span>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-bold">Empowering investors with intelligent market insights.</p>
          <p>
            &copy; 2025 FinxAI. All rights reserved. Investment involves risk. Past performance does not guarantee
            future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
