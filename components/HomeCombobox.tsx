"use client";

import { Bitcoin, ChevronsUpDownIcon, SquareActivity } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";

const navOptions = [
  { label: "Stocks", value: "/stocks", icon: <SquareActivity /> },
  { label: "Cryptos", value: "/cryptos", icon: <Bitcoin /> },
];

function HomeCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentNavOption = navOptions.find((nav) => nav.value === pathname);
    setValue(currentNavOption ? currentNavOption.value : "");
  }, [pathname]);

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between items-center bg-transparent light-blue-text font-medium text-gray-100"
        >
          {pathname === "/"
            ? "Home"
            : navOptions.find((nav) => nav.value === value)?.label}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0 bg-transparent border-0 font-medium">
        <Command className="bg-transparent glass-effect !rounded-2xl">
          <CommandList>
            <CommandGroup>
              {navOptions.map((nav) => (
                <CommandItem
                  className="hover:bg-transparent transition-all rounded-2xl"
                  key={nav.value}
                  value={nav.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    handleClick(nav.value);
                  }}
                >
                  <span className="mr-2">{nav.icon}</span>
                  {nav.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default HomeCombobox;
