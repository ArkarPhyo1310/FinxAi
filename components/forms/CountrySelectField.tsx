"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { countries } from "country-data-list";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";

const CountrySelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [open, setOpen] = useState(false);
  const countriesWithFlag = countries.all.filter(
    (country) => country.emoji && country.status !== "deleted" && country.ioc !== "PRK",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="country-select-trigger !bg-transparent glass-effect"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{countriesWithFlag.find((country) => country.alpha2 === value)?.emoji}</span>
              <span>{countriesWithFlag.find((country) => country.alpha2 === value)?.name}</span>
            </span>
          ) : (
            <span>Select your country...</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-gray-600 !bg-transparent glass-effect !rounded-md" align="start">
        <Command className="w-full border-gray-600 !bg-transparent glass-effect !rounded-md">
          <CommandInput
            placeholder="Search countries..."
            className="country-select-input !bg-transparent !glass-effect !rounded-md"
          />
          <CommandList className="max-h-60 scrollbar-hide-default !bg-transparent">
            <CommandEmpty className="country-select-empty !bg-transparent">No country found.</CommandEmpty>
            <CommandGroup className="bg-transparent">
              {countriesWithFlag.map((country) => (
                <CommandItem
                  key={country.alpha2}
                  value={`${country.name} ${country.alpha2}`}
                  onSelect={() => {
                    onChange(country.alpha2);
                    setOpen(false);
                  }}
                  className="country-select-item"
                >
                  <Check
                    className={cn("mr-2 h-4 w-4 text-sky-500", value === country.alpha2 ? "opacity-100" : "opacity-0")}
                  />
                  <span className="flex items-center gap-2">
                    <span>{country.emoji}</span>
                    <span>{country.name}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountrySelectField = ({ name, label, control, error, required }: CountrySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} />}
      />
      <p className="text-xs text-gray-500">Helps us show market data and news relevant to you.</p>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default CountrySelectField;
