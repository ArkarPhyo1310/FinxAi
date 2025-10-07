"use client";

import useShowNavItems from "@/hooks/useShowNavItems";
import Image from "next/image";
import Link from "next/link";
import HomeCombobox from "./HomeCombobox";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const showNavItems = useShowNavItems();

  return (
    <header className="sticky top-6 z-50 w-full px-6">
      <div className="container header-wrapper glass-effect md:gap-2">
        <Link href="/">
          <Image
            src="/assets/logo/logo.png"
            alt="FinxAI Logo"
            width={140}
            height={32}
            className="w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-2 justify-center">
          <HomeCombobox />
          {showNavItems && <NavItems />}
        </nav>
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
