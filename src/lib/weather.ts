import type { WeatherCondition } from "@/types/weather";

export interface GradientConfig {
  background: string;
  card: string;
  text: string;
  accent: string;
  label: string;
}

const GRADIENT_MAP: Record<WeatherCondition, GradientConfig> = {
  clear: {
    background: "bg-gradient-to-br from-amber-400 via-orange-300 to-sky-400",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "bg-amber-500 hover:bg-amber-600 text-white",
    label: "Clear & Sunny",
  },
  "partly-cloudy": {
    background: "bg-gradient-to-br from-sky-400 via-blue-300 to-slate-300",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "bg-sky-500 hover:bg-sky-600 text-white",
    label: "Partly Cloudy",
  },
  cloudy: {
    background: "bg-gradient-to-br from-slate-400 via-slate-300 to-zinc-400",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "bg-slate-500 hover:bg-slate-600 text-white",
    label: "Cloudy",
  },
  rainy: {
    background: "bg-gradient-to-br from-slate-700 via-blue-800 to-slate-600",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    text: "text-white",
    accent: "bg-blue-500 hover:bg-blue-600 text-white",
    label: "Rainy",
  },
  stormy: {
    background: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    text: "text-white",
    accent: "bg-purple-500 hover:bg-purple-600 text-white",
    label: "Stormy",
  },
  snowy: {
    background: "bg-gradient-to-br from-sky-100 via-blue-100 to-slate-200",
    card: "bg-white/40 backdrop-blur-sm border-white/60",
    text: "text-slate-800",
    accent: "bg-sky-400 hover:bg-sky-500 text-white",
    label: "Snowy",
  },
  foggy: {
    background: "bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400",
    card: "bg-white/30 backdrop-blur-sm border-white/40",
    text: "text-slate-700",
    accent: "bg-gray-500 hover:bg-gray-600 text-white",
    label: "Foggy",
  },
  windy: {
    background: "bg-gradient-to-br from-teal-400 via-cyan-300 to-emerald-400",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "bg-teal-500 hover:bg-teal-600 text-white",
    label: "Windy",
  },
};

export const DEFAULT_CONDITION: WeatherCondition = "clear";

export function getGradientConfig(condition: WeatherCondition): GradientConfig {
  return GRADIENT_MAP[condition];
}
