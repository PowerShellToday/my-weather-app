import { useEffect } from "react";
import { GeoPrompt } from "@/components/GeoPrompt";
import { Header } from "@/components/Header";
import { RecentSearches } from "@/components/RecentSearches";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useWeather } from "@/hooks/useWeather";
import { DEFAULT_CONDITION, getGradientConfig } from "@/lib/weather";

function App() {
  const { isDark, toggle } = useDarkMode();
  const { data, isLoading, error, search } = useWeather();
  const { recents, add: addRecent } = useRecentSearches();
  const { status: geoStatus, locate, dismiss: dismissGeo } = useGeolocation(search);

  const condition = data?.condition ?? DEFAULT_CONDITION;
  const gradient = getGradientConfig(condition);

  // Save canonical city name to recent searches after every successful fetch
  useEffect(() => {
    if (data) addRecent(data.city);
  }, [data, addRecent]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${gradient.background}`}>
      <main className="mx-auto max-w-2xl px-4 py-8 md:py-16 flex flex-col gap-4">
        <Header
          textClass={gradient.text}
          conditionLabel={gradient.label}
          isDark={isDark}
          onToggle={toggle}
        />
        <div className="flex flex-col gap-3">
          <SearchBar
            onSearch={search}
            isLoading={isLoading}
            accentClass={gradient.accent}
            textClass={gradient.text}
          />
          <GeoPrompt
            status={geoStatus}
            onLocate={locate}
            onDismiss={dismissGeo}
            cardClass={gradient.card}
            textClass={gradient.text}
            accentClass={gradient.accent}
          />
          <RecentSearches
            recents={recents}
            onSelect={search}
            isLoading={isLoading}
            textClass={gradient.text}
          />
        </div>
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-300/40 bg-red-500/25 backdrop-blur-sm px-4 py-3 text-sm font-medium text-white shadow"
          >
            {error}
          </div>
        )}
        {data && (
          <WeatherDisplay
            data={data}
            cardClass={gradient.card}
            textClass={gradient.text}
          />
        )}
      </main>
    </div>
  );
}

export default App;
