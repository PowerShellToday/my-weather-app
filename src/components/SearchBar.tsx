import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  accentClass: string;
  textClass: string;
}

export function SearchBar({ onSearch, isLoading, accentClass, textClass }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && !isLoading) {
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
      <div className="flex-1">
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
          disabled={isLoading}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`w-full bg-white/20 backdrop-blur-sm border-white/40 placeholder:opacity-70 focus-visible:ring-white/60 ${textClass} text-base`}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        aria-label={isLoading ? "Searching…" : "Search weather for entered city"}
        className={`shrink-0 font-semibold shadow-lg min-w-24 ${accentClass}`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="sr-only">Searching…</span>
          </span>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
