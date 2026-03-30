import type { GeoStatus } from "@/hooks/useGeolocation";

interface GeoPromptProps {
  status: GeoStatus;
  onLocate: () => void;
  onDismiss: () => void;
  cardClass: string;
  textClass: string;
  accentClass: string;
}

export function GeoPrompt({
  status,
  onLocate,
  onDismiss,
  cardClass,
  textClass,
  accentClass,
}: GeoPromptProps) {
  if (status === "dismissed") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow ${cardClass}`}
    >
      {status === "locating" ? (
        <>
          <svg
            aria-hidden="true"
            className="animate-spin shrink-0 h-5 w-5 opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className={`text-sm font-medium ${textClass}`}>Detecting your location…</p>
        </>
      ) : status === "denied" ? (
        <>
          <WarningIcon textClass={textClass} />
          <p className={`flex-1 text-sm ${textClass}`}>
            Location access was denied. You can still search manually above.
          </p>
          <DismissButton onDismiss={onDismiss} textClass={textClass} />
        </>
      ) : status === "error" ? (
        <>
          <WarningIcon textClass={textClass} />
          <p className={`flex-1 text-sm ${textClass}`}>
            Couldn't detect your location. You can still search manually above.
          </p>
          <DismissButton onDismiss={onDismiss} textClass={textClass} />
        </>
      ) : (
        // "prompt" state
        <>
          <PinIcon textClass={textClass} />
          <p className={`flex-1 text-sm font-medium ${textClass}`}>
            Show weather for your current location?
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onLocate}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold shadow transition-opacity hover:opacity-90 ${accentClass}`}
            >
              Use my location
            </button>
            <DismissButton onDismiss={onDismiss} textClass={textClass} />
          </div>
        </>
      )}
    </div>
  );
}

function PinIcon({ textClass }: { textClass: string }) {
  return (
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
      className={`shrink-0 opacity-80 ${textClass}`}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WarningIcon({ textClass }: { textClass: string }) {
  return (
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
      className={`shrink-0 opacity-80 ${textClass}`}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function DismissButton({
  onDismiss,
  textClass,
}: {
  onDismiss: () => void;
  textClass: string;
}) {
  return (
    <button
      onClick={onDismiss}
      aria-label="Dismiss"
      className={`rounded-full p-1 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${textClass}`}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
