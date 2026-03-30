import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  accentClass: string;
  textClass: string;
}

export function SearchBar({ onSearch, accentClass, textClass }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  return (
    <form
      role="search"
      aria-label="Search for a city"
      onSubmit={handleSubmit}
      className="flex gap-2 w-full"
    >
      <div className="flex-1 relative">
        <label htmlFor="city-search" className="sr-only">
          City name
        </label>
        <Input
          id="city-search"
          type="text"
          placeholder="Enter city name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-required="true"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`w-full bg-white/20 backdrop-blur-sm border-white/40 placeholder:opacity-70 focus-visible:ring-white/60 ${textClass} text-base`}
        />
      </div>
      <Button
        type="submit"
        aria-label="Search weather for entered city"
        className={`shrink-0 font-semibold shadow-lg ${accentClass}`}
      >
        Search
      </Button>
    </form>
  );
}
