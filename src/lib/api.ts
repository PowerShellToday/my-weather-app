import type { WeatherCondition, WeatherData, ForecastDay } from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

// Internal OWM response shapes
interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface OWMWeatherItem {
  id: number;
  icon: string;
  description: string;
}

interface OWMCurrentResponse {
  name: string;
  sys: { country: string };
  weather: OWMWeatherItem[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

interface OWMForecastEntry {
  dt_txt: string;
  main: { temp: number };
  weather: OWMWeatherItem[];
}

interface OWMForecastResponse {
  list: OWMForecastEntry[];
}

function owmIdToCondition(id: number): WeatherCondition {
  if (id >= 200 && id < 300) return "stormy";
  if (id >= 300 && id < 600) return "rainy";
  if (id >= 600 && id < 700) return "snowy";
  if (id >= 700 && id < 800) return "foggy";
  if (id === 800) return "clear";
  if (id === 801 || id === 802) return "partly-cloudy";
  return "cloudy"; // 803, 804
}

function processForecast(entries: OWMForecastEntry[]): ForecastDay[] {
  // Group 3-hour entries by calendar date
  const byDate = new Map<string, OWMForecastEntry[]>();
  for (const entry of entries) {
    const date = entry.dt_txt.split(" ")[0];
    const group = byDate.get(date) ?? [];
    group.push(entry);
    byDate.set(date, group);
  }

  // Skip today (first key); take the next 5 days
  const dates = [...byDate.keys()].slice(1, 6);

  return dates.map((dateStr) => {
    const group = byDate.get(dateStr)!;
    const temps = group.map((e) => e.main.temp);
    const highC = Math.round(Math.max(...temps));
    const lowC = Math.round(Math.min(...temps));

    // Use the noon entry (or middle of group) as the day's representative
    const representative =
      group.find((e) => e.dt_txt.includes("12:00:00")) ??
      group[Math.floor(group.length / 2)];

    const [year, month, day] = dateStr.split("-").map(Number);
    const dateLabel = new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return {
      date: dateLabel,
      highC,
      lowC,
      iconCode: representative.weather[0].icon,
      description: representative.weather[0].description,
    };
  });
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  // Step 1: Geocoding — city name → lat/lon
  const geoRes = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );
  if (!geoRes.ok) {
    throw new Error("Failed to connect to weather service. Please try again.");
  }
  const geoData: GeoLocation[] = await geoRes.json();
  if (geoData.length === 0) {
    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
  }

  const { lat, lon, name, country } = geoData[0];

  // Step 2: Current weather + 5-day forecast (parallel)
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
    fetch(`${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Failed to fetch weather data. Please try again.");
  }

  const current: OWMCurrentResponse = await currentRes.json();
  const forecastData: OWMForecastResponse = await forecastRes.json();

  return {
    city: name,
    country,
    condition: owmIdToCondition(current.weather[0].id),
    temperatureC: Math.round(current.main.temp),
    feelsLikeC: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windKph: Math.round(current.wind.speed * 3.6),
    description: current.weather[0].description,
    iconCode: current.weather[0].icon,
    forecast: processForecast(forecastData.list),
  };
}

export function owmIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
