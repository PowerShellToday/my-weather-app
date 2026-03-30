import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { DEFAULT_CONDITION, getGradientConfig } from "@/lib/weather";
import type { WeatherCondition } from "@/types/weather";

function App() {
  const [city, setCity] = useState("");
  const [condition] = useState<WeatherCondition>(DEFAULT_CONDITION);

  const gradient = getGradientConfig(condition);

  function handleSearch(searchedCity: string) {
    setCity(searchedCity);
    // Phase 2: call weather API here and update `condition` from response
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${gradient.background}`}>
      <main className="mx-auto max-w-2xl px-4 py-8 md:py-16 flex flex-col gap-8">
        <Header textClass={gradient.text} conditionLabel={gradient.label} />
        <SearchBar
          onSearch={handleSearch}
          accentClass={gradient.accent}
          textClass={gradient.text}
        />
        {city && (
          <WeatherDisplay
            city={city}
            cardClass={gradient.card}
            textClass={gradient.text}
          />
        )}
      </main>
    </div>
  );
}

export default App;
