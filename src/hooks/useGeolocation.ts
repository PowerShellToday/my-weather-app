import { useCallback, useState } from "react";
import { fetchCityFromCoords } from "@/lib/api";

export type GeoStatus =
  | "prompt"    // showing the offer
  | "locating"  // waiting for GPS + reverse geocode
  | "denied"    // browser permission denied
  | "error"     // position obtained but reverse geocode failed, or other error
  | "dismissed"; // user said no, or already asked before, or no geolocation support

const STORAGE_KEY = "pahul-weather-geo-asked";

export function useGeolocation(onCity: (city: string) => void) {
  const [status, setStatus] = useState<GeoStatus>(() => {
    if (!("geolocation" in navigator)) return "dismissed";
    if (localStorage.getItem(STORAGE_KEY)) return "dismissed";
    return "prompt";
  });

  const locate = useCallback(() => {
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const city = await fetchCityFromCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          localStorage.setItem(STORAGE_KEY, "located");
          setStatus("dismissed");
          onCity(city);
        } catch {
          setStatus("error");
        }
      },
      (err) => {
        localStorage.setItem(STORAGE_KEY, "denied");
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { timeout: 10000 }
    );
  }, [onCity]);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setStatus("dismissed");
  }, []);

  return { status, locate, dismiss };
}
