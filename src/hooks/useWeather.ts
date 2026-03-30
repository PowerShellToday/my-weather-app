import { useState, useCallback } from "react";
import { fetchWeather } from "@/lib/api";
import type { WeatherData } from "@/types/weather";

interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  search: (city: string) => Promise<void>;
}

export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(city);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, search };
}
