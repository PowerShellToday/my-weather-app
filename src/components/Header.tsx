interface HeaderProps {
  textClass: string;
  conditionLabel: string;
  isDark: boolean;
  onToggle: () => void;
}

export function Header({ textClass, conditionLabel, isDark, onToggle }: HeaderProps) {
  return (
    <header role="banner" className="relative flex items-center justify-center">
      <div className="text-center">
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg ${textClass}`}>
          PAHUL Weather
        </h1>
        <p
          aria-live="polite"
          className={`mt-2 text-sm font-medium uppercase tracking-widest opacity-80 ${textClass}`}
        >
          {conditionLabel}
        </p>
      </div>

      <button
        onClick={onToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2
          p-2.5 rounded-full
          bg-white/20 hover:bg-white/35 active:bg-white/45
          border border-white/30
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
          ${textClass}
        `}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}

function SunIcon() {
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
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
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
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
