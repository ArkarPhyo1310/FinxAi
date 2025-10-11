"use client";

import React, { useEffect, useState } from "react";

type WatchlistButtonProps = {
  symbol: string;
};

export default function WatchlistButton({ symbol }: WatchlistButtonProps) {
  const [saved, setSaved] = useState(false);
  const key = "watchlist";

  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      setSaved(list.includes(symbol.toUpperCase()));
    } catch {
      setSaved(false);
    }
  }, [symbol]);

  const toggle = () => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      const upper = symbol.toUpperCase();
      const exists = list.includes(upper);
      const newList = exists
        ? list.filter((s) => s !== upper)
        : [...list, upper];
      localStorage.setItem(key, JSON.stringify(newList));
      setSaved(!exists);
    } catch {
      localStorage.setItem(key, JSON.stringify([symbol.toUpperCase()]));
      setSaved(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-3 py-1 rounded text-sm ${
        saved ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"
      }`}
    >
      {saved ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
