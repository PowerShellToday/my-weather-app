import { useCallback, useState } from "react";

const STORAGE_KEY = "pahul-weather-recents";
const MAX_RECENTS = 5;

function loadRecents(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return (parsed as string[]).slice(0, MAX_RECENTS);
    return [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>(loadRecents);

  const add = useCallback((city: string) => {
    setRecents((prev) => {
      const deduped = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...deduped].slice(0, MAX_RECENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recents, add };
}
