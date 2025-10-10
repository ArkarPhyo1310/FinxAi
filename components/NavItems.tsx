"use client";

import { NAV_ITEMS } from "@/lib/constans";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBox from "./SearchBox";

const NavItems = ({
  initialStocks,
}: {
  initialStocks: StockWithWatchListStatus[];
}) => {
  const pathname = usePathname();

  let finnType = null;
  if (pathname?.startsWith("/stocks")) {
    finnType = "stocks";
  } else if (pathname?.startsWith("/cryptos")) {
    finnType = "cryptos";
  } else {
    finnType = null;
  }

  const isActive = (path: string) => {
    if (path === "/stocks/") return pathname === "/stocks";
    if (path === "/cryptos/") return pathname === "/cryptos";

    return pathname.startsWith(path);
  };

  return finnType ? (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
      <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS.map(({ href, title }) => {
          if (href == "/search")
            return (
              <li key="search-trigger">
                <SearchBox
                  renderAs="text"
                  label="Search"
                  initialStocks={initialStocks}
                />
              </li>
            );
          return (
            <li key={href}>
              <Link
                href={pathname + href}
                className={`light-blue-text transition-colors ${
                  isActive(pathname + href) ? "text-blue-400" : "text-gray-100"
                }`}
              >
                {title}
              </Link>
            </li>
          );
          return null;
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default NavItems;
