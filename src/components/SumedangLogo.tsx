export default function SumedangLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sumedangBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
      </defs>
      {/* outer ring */}
      <circle cx="50" cy="50" r="48" fill="url(#sumedangBg)" stroke="#fbbf24" strokeWidth="3" />
      {/* mountain */}
      <path d="M 18 65 L 35 38 L 50 55 L 65 32 L 82 65 Z" fill="#15803d" stroke="#064e3b" strokeWidth="1.5" />
      {/* sun */}
      <circle cx="50" cy="32" r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
      {/* rice stalks */}
      <g stroke="#ca8a04" strokeWidth="1.2" fill="#fde047">
        <ellipse cx="20" cy="78" rx="2" ry="4" transform="rotate(-25 20 78)" />
        <ellipse cx="25" cy="82" rx="2" ry="4" transform="rotate(-15 25 82)" />
        <ellipse cx="80" cy="78" rx="2" ry="4" transform="rotate(25 80 78)" />
        <ellipse cx="75" cy="82" rx="2" ry="4" transform="rotate(15 75 82)" />
      </g>
      {/* base */}
      <rect x="38" y="68" width="24" height="6" fill="#92400e" rx="1" />
      <text x="50" y="92" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fef3c7" fontFamily="serif">SMD</text>
    </svg>
  );
}
