interface RecentSearchesProps {
  recents: string[];
  onSelect: (city: string) => void;
  isLoading: boolean;
  textClass: string;
}

export function RecentSearches({
  recents,
  onSelect,
  isLoading,
  textClass,
}: RecentSearchesProps) {
  if (recents.length === 0) return null;

  return (
    <nav aria-label="Recent searches">
      <p className={`mb-2 text-xs font-semibold uppercase tracking-widest opacity-60 ${textClass}`}>
        Recent
      </p>
      <ul className="flex flex-wrap gap-2">
        {recents.map((city) => (
          <li key={city}>
            <button
              onClick={() => onSelect(city)}
              disabled={isLoading}
              aria-label={`Search weather for ${city}`}
              className={`
                rounded-full border border-white/30 bg-white/15 hover:bg-white/25
                px-3 py-1 text-sm font-medium
                transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                ${textClass}
              `}
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
