import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useShowNavItems = () => {
  const pathname = usePathname();
  const [showNavItems, setShowNavItems] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    setShowNavItems(!isHome);
  }, [isHome]);
  
  return showNavItems;
};

export default useShowNavItems;
