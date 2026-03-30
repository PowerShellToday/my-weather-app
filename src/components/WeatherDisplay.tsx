import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { owmIconUrl } from "@/lib/api";
import type { WeatherData } from "@/types/weather";

interface WeatherDisplayProps {
  data: WeatherData;
  cardClass: string;
  textClass: string;
}

export function WeatherDisplay({ data, cardClass, textClass }: WeatherDisplayProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the city heading whenever new results arrive
  useEffect(() => {
    headingRef.current?.focus();
  }, [data.city]);

  const muted = `${textClass} opacity-75`;

  return (
    <div aria-live="polite" className="flex flex-col gap-4">
      {/* Current weather card */}
      <Card
        role="region"
        aria-label={`Current weather for ${data.city}`}
        className={`border ${cardClass} shadow-xl`}
      >
        <CardHeader className="pb-0">
          <p className={`text-sm font-medium uppercase tracking-widest ${muted}`}>
            Current weather
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className={`text-3xl md:text-4xl font-bold tracking-tight outline-none ${textClass}`}
          >
            {data.city},{" "}
            <span className="font-normal opacity-80">{data.country}</span>
          </h2>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Temperature + icon row */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`text-7xl font-extrabold leading-none tabular-nums ${textClass}`}
                aria-label={`${data.temperatureC} degrees Celsius`}
              >
                {data.temperatureC}
                <span className="text-4xl align-super ml-1">°C</span>
              </p>
              <p className={`mt-1 capitalize text-base ${muted}`}>{data.description}</p>
              <p className={`text-sm mt-0.5 ${muted}`}>
                Feels like {data.feelsLikeC}°C
              </p>
            </div>
            <img
              src={owmIconUrl(data.iconCode)}
              alt={data.description}
              width={100}
              height={100}
              className="drop-shadow-lg"
            />
          </div>

          {/* Stats row */}
          <div className={`mt-5 grid grid-cols-2 gap-3 text-sm ${textClass}`}>
            <div className={`flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2`}>
              {/* Humidity icon */}
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <div>
                <p className="opacity-70 text-xs uppercase tracking-wide">Humidity</p>
                <p className="font-semibold">{data.humidity}%</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2`}>
              {/* Wind icon */}
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
              </svg>
              <div>
                <p className="opacity-70 text-xs uppercase tracking-wide">Wind</p>
                <p className="font-semibold">{data.windKph} km/h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-day forecast card */}
      {data.forecast.length > 0 && (
        <Card
          role="region"
          aria-label="5-day forecast"
          className={`border ${cardClass} shadow-xl`}
        >
          <CardHeader className="pb-2">
            <h3 className={`text-sm font-medium uppercase tracking-widest ${muted}`}>
              5-Day Forecast
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="grid grid-cols-5 gap-1" aria-label="Daily forecast">
              {data.forecast.map((day) => (
                <li
                  key={day.date}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className={`text-xs font-medium ${muted}`}>{day.date}</span>
                  <img
                    src={owmIconUrl(day.iconCode)}
                    alt={day.description}
                    width={40}
                    height={40}
                    className="drop-shadow"
                  />
                  <span
                    className={`text-sm font-bold ${textClass}`}
                    aria-label={`High ${day.highC} degrees`}
                  >
                    {day.highC}°
                  </span>
                  <span
                    className={`text-xs ${muted}`}
                    aria-label={`Low ${day.lowC} degrees`}
                  >
                    {day.lowC}°
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
