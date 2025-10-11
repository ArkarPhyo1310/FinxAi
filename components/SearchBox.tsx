"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDebounce } from "@/hooks/userDebounce";
import { searchCryptos } from "@/lib/actions/coingecko.action";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { Loader2, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const SearchBox = ({
  renderAs = "button",
  label = "Add stock",
}: SearchCommandProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<
    StockWithWatchlistStatus[] | CryptoWithWatchlistStatus[]
  >([]);
  const [initialStocks, setInitialStocks] = useState<
    StockWithWatchlistStatus[]
  >([]);
  const [initialCryptos, setInitialCryptos] = useState<
    CryptoWithWatchlistStatus[]
  >([]);
  const [filter, setFilter] = useState<"stocks" | "cryptos">("stocks");

  // Fetch initial stocks and cryptos only once
  useEffect(() => {
    let mounted = true;
    Promise.all([searchStocks(), searchCryptos()]).then(([stocks, cryptos]) => {
      if (!mounted) return;
      setInitialStocks(stocks);
      setInitialCryptos(cryptos);
      // Set initial assets based on default filter
      setAssets(filter === "stocks" ? stocks : cryptos);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When filter changes, reset assets to the correct initial list
  useEffect(() => {
    setAssets(filter === "stocks" ? initialStocks : initialCryptos);
    setSearchTerm("");
  }, [filter, initialStocks, initialCryptos]);

  const isSearchMode = !!searchTerm.trim();
  const displayAssets = isSearchMode ? assets : assets?.slice(0, 10);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) {
      setAssets(filter === "stocks" ? initialStocks : initialCryptos);
      return;
    }

    setLoading(true);
    try {
      let results: StockWithWatchlistStatus[] = [];
      results =
        filter === "stocks"
          ? await searchStocks(searchTerm.trim())
          : await searchCryptos(searchTerm.trim());
      setAssets(results);
    } catch {
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debounceSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSelectAsset = () => {
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {renderAs === "text" ? (
        <span onClick={() => setOpen(true)} className="search-text">
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className="search-btn">
          {label}
        </Button>
      )}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog glass-effect scrollbar-hide-default"
      >
        <div className="search-field glass-effect !rounded-none">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder={
              filter === "stocks" ? "Search Stocks..." : "Search Cryptos..."
            }
            className="search-input"
          />
          {loading && <Loader2 className="search-loader" />}

          <RadioGroup
            value={filter}
            onValueChange={(val) => setFilter(val as "stocks" | "cryptos")}
            className="flex items-center gap-4 m-4"
          >
            <div
              className={`flex items-center gap-3 group cursor-pointer ${
                filter === "stocks" ? "text-sky-500" : ""
              }`}
            >
              <RadioGroupItem
                value="stocks"
                id="stocks"
                className={`cursor-pointer group-hover:border-sky-500 group-hover:ring-sky-500 ${
                  filter === "stocks" ? "border-sky-500 ring-sky-500" : ""
                }`}
              />
              <Label
                htmlFor="stocks"
                className={`cursor-pointer group-hover:text-sky-400 transition-colors ${
                  filter === "stocks" ? "text-sky-500 font-semibold" : ""
                }`}
              >
                Stocks
              </Label>
            </div>
            <div
              className={`flex items-center gap-3 group cursor-pointer ${
                filter === "cryptos" ? "text-sky-500" : ""
              }`}
            >
              <RadioGroupItem
                value="cryptos"
                id="cryptos"
                className={`cursor-pointer group-hover:border-sky-500 group-hover:ring-sky-500 ${
                  filter === "cryptos" ? "border-sky-500 ring-sky-500" : ""
                }`}
              />
              <Label
                htmlFor="cryptos"
                className={`cursor-pointer group-hover:text-sky-400 transition-colors ${
                  filter === "cryptos" ? "text-sky-500 font-semibold" : ""
                }`}
              >
                Cryptos
              </Label>
            </div>
          </RadioGroup>
        </div>

        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : displayAssets?.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found." : "No stocks available."}
            </div>
          ) : (
            <ul>
              {displayAssets?.map((asset) => (
                <li key={asset.symbol} className="search-item">
                  <Link
                    href={`/${filter}/${asset.symbol}`}
                    onClick={handleSelectAsset}
                    className="search-item-link"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name hover:text-sky-500">
                        {asset.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {asset.symbol} | {asset.type}
                      </div>
                    </div>
                    <Star />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBox;
