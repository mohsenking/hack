// Alpine landscape + arches backdrop (SVG). `variant` shifts the composition per slide.
export default function Scene({ variant = 0, className = '' }) {
  const peaks = [
    'M0 300 L120 150 L170 205 L250 90 L360 260 L420 300 Z',
    'M0 300 L90 190 L190 110 L260 200 L380 140 L420 300 Z',
    'M0 300 L60 230 L180 160 L240 70 L330 210 L420 300 Z',
  ][variant % 3]
  return (
    <svg className={className} viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe8f7" />
          <stop offset="1" stopColor="#f6f9fd" />
        </linearGradient>
        <linearGradient id={`mt${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#b8cce6" />
          <stop offset="1" stopColor="#7e9cc7" />
        </linearGradient>
      </defs>
      <rect width="420" height="300" fill={`url(#sky${variant})`} />
      <path d={peaks} fill={`url(#mt${variant})`} opacity=".9" />
      <path d="M0 300 L140 220 L260 270 L420 210 L420 300 Z" fill="#e8f0fa" />
      <g fill="none" stroke="#fff" strokeWidth="14" opacity=".85">
        <circle cx="250" cy="130" r="95" />
        <circle cx="370" cy="150" r="70" opacity=".7" />
      </g>
      <rect x="0" y="262" width="420" height="38" fill="#f4f7fb" />
    </svg>
  )
}
