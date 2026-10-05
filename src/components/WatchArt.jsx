import { useId } from 'react'

const METALS = {
  steel: ['#f3f6fa', '#8d98a8'],
  gold: ['#f6e4b4', '#a98443'],
  rose: ['#f5d8cc', '#b87b68'],
  black: ['#555b66', '#14161a'],
}

// Parametric watch illustration (SVG) — dial colour, case metal, strap style.
export default function WatchArt({ dial = '#1b3a78', metal = 'steel', strap = 'bracelet', smart = false, skeleton = false, label = 'TIMEZONE', title = 'Watch', className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [m1, m2] = METALS[metal] || METALS.steel
  const light = ['#f4efe6', '#e9eef5', '#f1d9d0'].includes(dial)
  const ink = light ? '#1a2640' : '#f2f5fa'
  const ticks = Array.from({ length: 12 }, (_, i) => i)
  const links = Array.from({ length: 6 }, (_, i) => i)
  const strapFill = strap === 'leather' ? '#2a2018' : strap === 'rubber' ? '#15171b' : `url(#m${uid})`

  const Strap = ({ y, flip }) => (
    <g>
      <rect x="68" y={y} width="64" height="82" rx="6" fill={strapFill} />
      {strap === 'bracelet' &&
        links.map((i) => <rect key={i} x="70" y={y + 3 + i * 13.5} width="60" height="1.6" fill={m2} opacity=".55" />)}
      {strap !== 'bracelet' && (
        <rect x="72" y={y + 4} width="56" height="74" rx="4" fill="none" stroke={strap === 'leather' ? '#c9a46a' : '#2c3037'} strokeWidth="1" strokeDasharray="3 3" transform={flip ? '' : ''} />
      )}
    </g>
  )

  return (
    <svg className={`watch-art ${className}`} viewBox="0 0 200 300" role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`m${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m1} />
          <stop offset=".5" stopColor={m2} />
          <stop offset="1" stopColor={m1} />
        </linearGradient>
        <radialGradient id={`d${uid}`} cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor={dial} stopOpacity="1" />
          <stop offset="1" stopColor={dial} stopOpacity=".78" />
        </radialGradient>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="286" rx="52" ry="5" fill="#0b2a5b" opacity=".12" />
      <Strap y={0} />
      <Strap y={218} />
      {smart ? (
        <g>
          <rect x="44" y="94" width="112" height="112" rx="26" fill={`url(#m${uid})`} />
          <rect x="52" y="102" width="96" height="96" rx="20" fill="#07080b" />
          <text x="100" y="150" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="500">10:09</text>
          <text x="100" y="168" textAnchor="middle" fill="#7fb0ff" fontFamily="Inter, sans-serif" fontSize="8">MON 5 OCT</text>
          <circle cx="100" cy="120" r="3" fill="#7fb0ff" />
          <rect x="156" y="130" width="5" height="18" rx="2" fill={m2} />
          <rect x="52" y="102" width="96" height="96" rx="20" fill={`url(#g${uid})`} />
        </g>
      ) : (
        <g>
          <rect x="159" y="141" width="9" height="18" rx="3" fill={`url(#m${uid})`} />
          <circle cx="100" cy="150" r="64" fill={`url(#m${uid})`} />
          <circle cx="100" cy="150" r="57" fill={metal === 'black' ? '#23262c' : m1} opacity=".9" />
          <circle cx="100" cy="150" r="51" fill={`url(#d${uid})`} />
          {skeleton && (
            <g fill="none" stroke={m1} strokeWidth="1.4" opacity=".85">
              <circle cx="100" cy="150" r="22" />
              <circle cx="100" cy="150" r="13" strokeDasharray="3 2" />
              <circle cx="78" cy="168" r="7" />
            </g>
          )}
          {ticks.map((i) => (
            <rect key={i} x="99" y="102" width={i % 3 === 0 ? 2.6 : 1.4} height={i % 3 === 0 ? 9 : 6} fill={ink} transform={`rotate(${i * 30} 100 150)`} />
          ))}
          <text x="100" y="128" textAnchor="middle" fill={ink} fontFamily="Cormorant Garamond, serif" fontSize="7.5" letterSpacing="1.2" fontWeight="700">{label}</text>
          <text x="100" y="178" textAnchor="middle" fill={ink} opacity=".7" fontFamily="Inter, sans-serif" fontSize="4.5" letterSpacing="1.5">AUTOMATIC</text>
          <rect x="128" y="146" width="10" height="8" fill="#fff" opacity=".9" rx="1" />
          <g stroke={ink} strokeLinecap="round">
            <line x1="100" y1="150" x2="100" y2="118" strokeWidth="2.6" transform="rotate(-60 100 150)" />
            <line x1="100" y1="150" x2="100" y2="108" strokeWidth="2" transform="rotate(54 100 150)" />
            <line x1="100" y1="160" x2="100" y2="106" strokeWidth=".8" stroke="#c9a46a" transform="rotate(150 100 150)" />
          </g>
          <circle cx="100" cy="150" r="3" fill="#c9a46a" />
          <circle cx="100" cy="150" r="51" fill={`url(#g${uid})`} />
        </g>
      )}
    </svg>
  )
}
