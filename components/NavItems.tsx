"use client";

import { Stars } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBox from "./SearchBox";

interface NAVITEMS {
  href: string;
  title: string;
}

const NavItems = () => {
  const pathname = usePathname();

  let navItems: NAVITEMS[] = [];
  if (pathname?.startsWith("/stocks")) {
    navItems = [
      { href: "/stocks", title: "Dashboard" },
      { href: "/stocks/watchlist", title: "Watchlist" },
      { href: "/stocks/news", title: "News" },
    ];
  } else if (pathname?.startsWith("/cryptos")) {
    navItems = [
      { href: "/cryptos", title: "Dashboard" },
      { href: "/cryptos/watchlist", title: "Watchlist" },
      { href: "/cryptos/news", title: "News" },
    ];
  }

  const isActive = (path: string) => {
    if (path === "/stocks/") return pathname === "/stocks";
    if (path === "/cryptos/") return pathname === "/cryptos";

    return pathname.startsWith(path);
  };

  return (
    <>
      {navItems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
          <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {navItems.map(({ href, title }) => {
              if (href.endsWith("search"))
                return (
                  <li key="search-trigger">
                    <SearchBox renderAs="text" label="Search" />
                  </li>
                );
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`light-blue-text transition-colors ${
                      isActive(href) ? "text-blue-400" : "text-gray-100"
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <SearchBox renderAs="text" label="Search" />

      <Link
        href="/ai"
        className={`flex gap-3 items-center justify-start m-3 transition-colors hover:text-sky-500 ${
          isActive("/ai") ? "text-sky-500" : "text-gray-400"
        }`}
      >
        <Stars className="h-4 w-4" />
        AI
      </Link>
    </>
  );
};

export default NavItems;
