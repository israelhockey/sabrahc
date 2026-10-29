/** The Sabra HC jersey with a number on it: the stand-in until a player's photo is uploaded. */
const Jersey = ({ number, className = "mx-auto h-auto w-[70%]" }: { number: number | string; className?: string }) => (
  <svg viewBox="0 0 200 190" aria-hidden="true" className={className}>
    <path d="M60 14 L84 8 Q100 26 116 8 L140 14 L190 50 L172 96 L150 86 L150 182 L50 182 L50 86 L28 96 L10 50 Z" fill="#0F3B2A" stroke="#E8B547" strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 150 H150 V160 H50 Z M50 166 H150 V170 H50 Z" fill="#E8B547" />
    <text x="100" y="128" textAnchor="middle" fontFamily="Oswald, sans-serif" fontWeight="900" fontSize="56" fill="#F3E9D2">
      {number}
    </text>
  </svg>
);

export default Jersey;
