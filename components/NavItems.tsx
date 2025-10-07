"use client";

import { NAV_ITEMS } from "@/lib/constans";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/stocks/") return pathname === "/stocks";
    if (path === "/cryptos/") return pathname === "/cryptos";

    return pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
      <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <Link
              href={pathname + item.href}
              className={`light-blue-text transition-colors ${
                isActive(pathname + item.href)
                  ? "text-blue-400"
                  : "text-gray-100"
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
