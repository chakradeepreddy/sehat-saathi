// src/components/ui/Logo.jsx
// ─────────────────────────────────────────────────────────────
// Sehat Saathi brand logo — unique concept:
//
// A bold "S" letterform (representing Sehat Saathi) with a live
// ECG heartbeat line running through its crossing point — where
// the two arcs of the S meet. The heartbeat spike symbolises that
// technology is literally bringing health to life. At the smallest
// sizes only the S is shown for clarity.
//
// Design rationale:
// • S + ECG = instantly readable as a health-tech brand
// • No medical cross (everyone uses it — we don't)
// • The S waist IS the heartbeat crossing — brand storytelling
// • Scales from 28px nav icon to 96px splash screen
// • Inline SVG = no external dependency, instant render
// ─────────────────────────────────────────────────────────────

const SIZES = {
  xs:    { d: 28,  textSize: 'text-sm',  sub: 'text-[10px]', gap: 'gap-2'   },
  sm:    { d: 36,  textSize: 'text-sm',  sub: 'text-[10px]', gap: 'gap-2'   },
  md:    { d: 44,  textSize: 'text-lg',  sub: 'text-xs',     gap: 'gap-2.5' },
  lg:    { d: 56,  textSize: 'text-2xl', sub: 'text-sm',     gap: 'gap-3'   },
  xl:    { d: 72,  textSize: 'text-3xl', sub: 'text-base',   gap: 'gap-4'   },
  '2xl': { d: 96,  textSize: 'text-4xl', sub: 'text-lg',     gap: 'gap-5'   },
}

/**
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [size='md']
 * @param {'color'|'white'|'dark'}           [variant='color']
 * @param {boolean}                          [showText=true]
 * @param {boolean}                          [iconOnly=false]
 * @param {string}                           [className]
 */
const Logo = ({
  size = 'md',
  variant = 'color',
  showText = true,
  iconOnly = false,
  className = '',
}) => {
  const s    = SIZES[size] ?? SIZES.md
  const d    = s.d
  // Scale all internal coordinates (designed at 48px)
  const scale = d / 48
  const isWhite = variant === 'white'
  const isDark  = variant === 'dark'

  // Unique gradient ID per instance to avoid SVG defs collision
  const gId = `ssGrad-${size}-${variant}`

  const textColor = isWhite ? 'text-white'       : isDark ? 'text-slate-900'       : 'text-brand-700'
  const subColor  = isWhite ? 'text-white/70'    : isDark ? 'text-slate-500'       : 'text-brand-400'

  const showDetail = d >= 36  // Hide ECG detail at very small sizes

  return (
    <div className={`inline-flex items-center ${s.gap} ${className}`}>

      {/* ── Icon mark ─────────────────────────────────────────── */}
      <svg
        width={d}
        height={d}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sehat Saathi logo"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={gId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0284c7" />
            <stop offset="55%"  stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          {/* Glow filter for the heartbeat peak dot */}
          <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background — rounded square */}
        <rect
          width="48"
          height="48"
          rx="13"
          fill={isWhite ? 'white' : `url(#${gId})`}
        />

        {/*
          ── The bold S letterform ──────────────────────────────
          Path logic: Two smooth C-bezier arcs forming a classic S.
          The S runs from top-right (32,10) through the centre
          crossing (≈24,24) to bottom-left (16,38).

          Arc 1 (upper): right → over top → lands left at crossing
          Arc 2 (lower): left → under bottom → lands right at end

          stroke-only (fill:none), rounded caps for softness.
        */}
        {/*
          ── The bold S letterform ──────────────────────────────
        */}
        <path
          d="M 33,11
             C 33,4 17,4 17,14
             C 17,20 33,28 33,34
             C 33,44 17,44 17,37"
          stroke={isWhite ? '#0ea5e9' : 'url(#s-gradient)'}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
        />

        <defs>
          <linearGradient id="s-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/*
          ── ECG heartbeat line ─────────────────────────────────
          Runs horizontally at y≈24 (the S crossing point).
          A flat baseline on both sides with ONE QRS spike.
          Placed in the negative space to the RIGHT of the S
          crossing, between x=22 and x=44.
          Spike apex at (33, 16) — reaches up into the upper
          right counter of the S (the empty white space there).
          The spike tip touches the S at exactly its inflection,
          suggesting the heartbeat powers the S letter.
        */}
        {/*
          ── ECG heartbeat line ─────────────────────────────────
        */}
        {showDetail && (
          <>
            <path
              d="M 22,24 L 26.5,24 L 28.5,18 L 31.5,31 L 33.5,24 L 44,24"
              stroke={isWhite ? '#0ea5e9' : 'white'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.95"
              strokeDasharray="50"
              strokeDashoffset="50"
              filter={`url(#glow-${size})`}
            >
              <animate attributeName="stroke-dashoffset" values="50;0;0;50" keyTimes="0;0.35;0.65;1" dur="3s" repeatCount="indefinite" />
            </path>

            {/* Glowing peak dot — the "life moment" */}
            <circle
              cx="28.5"
              cy="18"
              r="2.5"
              fill={isWhite ? '#0284c7' : '#bae6fd'}
              opacity="0.9"
              filter={`url(#glow-${size})`}
            >
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.35;0.65;1" dur="3s" repeatCount="indefinite" />
              <animate attributeName="r" values="1;3;3;1" keyTimes="0;0.35;0.65;1" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Trailing dot — suggests the pulse continues */}
            <circle cx="41" cy="24" r="1.5" fill={isWhite ? '#0ea5e9' : 'white'} opacity="0.6" />
            <circle cx="45" cy="24" r="1" fill={isWhite ? '#0ea5e9' : 'white'} opacity="0.4" />
          </>
        )}
      </svg>

      {/* ── Text mark ─────────────────────────────────────────── */}
      {showText && !iconOnly && (
        <div className="flex flex-col leading-none select-none">
          <span
            className={`font-display font-bold tracking-tight ${s.textSize} ${textColor}`}
            style={{ letterSpacing: '-0.02em' }}
          >
            Sehat Saathi
          </span>
          <span className={`font-sans ${s.sub} ${subColor} mt-0.5 tracking-wide`}>
            स्वास्थ्य साथी
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
