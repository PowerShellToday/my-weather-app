interface HeaderProps {
  textClass: string;
  conditionLabel: string;
}

export function Header({ textClass, conditionLabel }: HeaderProps) {
  return (
    <header role="banner" className="text-center">
      <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg ${textClass}`}>
        PAHUL Weather
      </h1>
      <p
        aria-live="polite"
        className={`mt-2 text-sm font-medium uppercase tracking-widest opacity-80 ${textClass}`}
      >
        {conditionLabel}
      </p>
    </header>
  );
}
