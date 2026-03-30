import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface WeatherDisplayProps {
  city: string;
  cardClass: string;
  textClass: string;
}

export function WeatherDisplay({ city, cardClass, textClass }: WeatherDisplayProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [city]);

  return (
    <div aria-live="polite">
      <Card
        role="region"
        aria-label={`Weather results for ${city}`}
        className={`border ${cardClass} shadow-xl`}
      >
        <CardHeader className="pb-2">
          <p className={`text-sm font-medium uppercase tracking-widest opacity-70 ${textClass}`}>
            Weather for
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className={`text-3xl md:text-4xl font-bold tracking-tight outline-none ${textClass}`}
          >
            {city}
          </h2>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center gap-3 mt-2 opacity-75 ${textClass}`}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span className="text-sm italic">Weather data coming soon…</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
