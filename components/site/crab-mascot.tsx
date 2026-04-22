/**
 * Hand-drawn crab — homage to the cover art where the stickman/woman
 * beat up a red crab (rak). Stroke-only SVG so we can filter it with
 * the global marker-wobble for a sharpie feel.
 */
export function CrabMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Body */}
      <g stroke="#dc2320" strokeWidth="6" className="wobble">
        <ellipse cx="110" cy="108" rx="52" ry="30" />
        {/* Eyes */}
        <line x1="90" y1="82" x2="84" y2="66" />
        <line x1="130" y1="82" x2="136" y2="66" />
        <circle cx="82" cy="62" r="5" fill="#dc2320" />
        <circle cx="138" cy="62" r="5" fill="#dc2320" />

        {/* Left big claw */}
        <path d="M 60 100 C 30 100 20 70 30 50" />
        <path d="M 30 50 C 14 58 8 40 22 30 C 34 22 48 38 44 48" />
        {/* Right big claw */}
        <path d="M 160 100 C 190 100 200 70 190 50" />
        <path d="M 190 50 C 206 58 212 40 198 30 C 186 22 172 38 176 48" />

        {/* Legs left */}
        <path d="M 72 130 L 58 152" />
        <path d="M 86 136 L 78 162" />
        <path d="M 100 138 L 98 168" />
        {/* Legs right */}
        <path d="M 148 130 L 162 152" />
        <path d="M 134 136 L 142 162" />
        <path d="M 120 138 L 122 168" />

        {/* Angry crosses for mouth */}
        <path d="M 100 115 L 120 115" />
        <path d="M 104 120 L 116 110" />
      </g>
    </svg>
  );
}
