import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { DEFAULT_CONDITION, getGradientConfig } from "@/lib/weather";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useWeather } from "@/hooks/useWeather";

function App() {
  const { isDark, toggle } = useDarkMode();
  const { data, isLoading, error, search } = useWeather();

  const condition = data?.condition ?? DEFAULT_CONDITION;
  const gradient = getGradientConfig(condition);

  return (
    <div className={`min-h-screen transition-all duration-500 ${gradient.background}`}>
      <main className="mx-auto max-w-2xl px-4 py-8 md:py-16 flex flex-col gap-6">
        <Header
          textClass={gradient.text}
          conditionLabel={gradient.label}
          isDark={isDark}
          onToggle={toggle}
        />
        <SearchBar
          onSearch={search}
          isLoading={isLoading}
          accentClass={gradient.accent}
          textClass={gradient.text}
        />
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
