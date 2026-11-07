/** True Suar Studio Latin Cross + Torch Flame ("Suar") + Audio Waveform Emblem.
 * Matches AnimatedSuarLogo from promo video & official brand identity.
 */
export function Emblem({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Latin Cross (Vertical line y=48..120, Crossbar high at y=70) */}
      <g stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" fill="none">
        <line x1="64" y1="48" x2="64" y2="120" />
        <line x1="40" y1="70" x2="88" y2="70" />
      </g>

      {/* Sharpened Twin-Tongue Torch Flame ("Suar") */}
      <path
        d="M62 42 C52 38, 49 27, 56 16 C60 9, 65 5, 67 0.5 C64.5 9, 67.5 16, 65.5 25 C63.5 33, 60.5 37, 62 42 Z"
        fill="currentColor"
      />
      <path
        d="M66.5 42 C66.5 35, 70.5 29, 71.5 22 C72.5 16.5, 71 12.5, 73 7.5 C78.5 15, 79.5 26, 74.5 34.5 C72 38.5, 69 41, 66.5 42 Z"
        fill="currentColor"
      />

      {/* Symmetrical Audio Waveform Bars aligned to Crossbar y=70 */}
      <g fill="currentColor">
        <rect x="21" y="54" width="7.5" height="32" rx="3.75" />
        <rect x="99.5" y="54" width="7.5" height="32" rx="3.75" />
        <rect x="8" y="61" width="7.5" height="18" rx="3.75" />
        <rect x="112.5" y="61" width="7.5" height="18" rx="3.75" />
      </g>
    </svg>
  );
}
