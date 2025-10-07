"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeCombobox from "./HomeCombobox";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const pathname = usePathname();
  const [showNavItems, setShowNavItems] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    setShowNavItems(!isHome);
  }, [isHome]);

  return (
    <header className="sticky top-6 z-50 w-full px-6">
      <div className="container header-wrapper glass-effect">
        <Link href="/">
          <Image
            src="/assets/logo/logo.png"
            alt="FinxAI Logo"
            width={140}
            height={32}
            className="w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-4 justify-center">
          <HomeCombobox />
          {showNavItems && <NavItems />}
        </nav>
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
