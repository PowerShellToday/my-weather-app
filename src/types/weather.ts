export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "windy";

export interface ForecastDay {
  date: string;
  highC: number;
  lowC: number;
  iconCode: string;
  description: string;
}

export interface WeatherData {
  city: string;
  country: string;
  condition: WeatherCondition;
  temperatureC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  description: string;
  iconCode: string;
  forecast: ForecastDay[];
}
