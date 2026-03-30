export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "windy";

export interface WeatherData {
  city: string;
  country: string;
  condition: WeatherCondition;
  temperatureC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  description: string;
}
