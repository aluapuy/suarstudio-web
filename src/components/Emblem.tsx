/** Torch-cross emblem with waveform bars. Used in navbar and footer. */
export function Emblem({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <line x1="16" y1="10" x2="16" y2="28" />
        <line x1="10" y1="18" x2="22" y2="18" />
        <path
          d="M16 10 C16 6, 13 4, 14 2 C15 4, 16 3.5, 16 2 C16 3.5, 17 4, 18 2 C19 4, 16 6, 16 10"
          fill="currentColor"
          stroke="none"
        />
      </g>
      <g fill="currentColor" opacity="0.45">
        <rect x="5" y="16" width="2" height="6" rx="1" />
        <rect x="25" y="15" width="2" height="8" rx="1" />
        <rect x="2" y="18" width="2" height="3" rx="1" />
        <rect x="28" y="17" width="2" height="5" rx="1" />
      </g>
    </svg>
  );
}
