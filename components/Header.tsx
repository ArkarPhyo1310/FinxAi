import Image from "next/image";
import Link from "next/link";
import HomeCombobox from "./HomeCombobox";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = async ({ user }: { user: User }) => {
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
        <nav className="hidden sm:flex items-center gap-4 justify-center">
          <HomeCombobox />
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;
