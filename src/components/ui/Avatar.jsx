// src/components/ui/Avatar.jsx
// ─────────────────────────────────────────────────────────────
// Avatar with image loading state, fallback initials, online indicator.
// Used for doctors, patients, and AI assistant.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'

const SIZES = {
  xs:  'w-7  h-7  text-xs',
  sm:  'w-9  h-9  text-sm',
  md:  'w-12 h-12 text-base',
  lg:  'w-16 h-16 text-xl',
  xl:  'w-20 h-20 text-2xl',
  '2xl': 'w-24 h-24 text-3xl',
}

const DOT_SIZES = {
  xs:  'w-2 h-2 border',
  sm:  'w-2.5 h-2.5 border',
  md:  'w-3 h-3 border-2',
  lg:  'w-3.5 h-3.5 border-2',
  xl:  'w-4 h-4 border-2',
  '2xl': 'w-4 h-4 border-2',
}

/**
 * @param {object} props
 * @param {string} [props.src]       - Image URL
 * @param {string} [props.name]      - Full name for fallback initials
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [props.size='md']
 * @param {boolean} [props.online]   - Show green online indicator
 * @param {string}  [props.className]
 * @param {string}  [props.ring]     - e.g. 'ring-2 ring-white' for layered avatars
 */
const Avatar = ({
  src,
  name = '',
  size = 'md',
  online,
  className = '',
  ring = '',
  ...props
}) => {
  const [imgError, setImgError] = useState(false)

  // Generate initials from name
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  const showImage = src && !imgError

  return (
    <div className={`relative shrink-0 ${SIZES[size] || SIZES.md} ${className}`} {...props}>
      {/* Avatar image or fallback */}
      <div
        className={[
          'w-full h-full rounded-full overflow-hidden',
          'flex items-center justify-center select-none',
          'bg-brand-gradient font-display font-bold text-white',
          ring,
        ].join(' ')}
      >
        {showImage ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className={SIZES[size].split(' ')[2]}>{initials || '?'}</span>
        )}
      </div>

      {/* Online indicator */}
      {online !== undefined && (
        <span
          className={[
            'absolute bottom-0 right-0 rounded-full border-white',
            DOT_SIZES[size] || DOT_SIZES.md,
            online ? 'bg-success-500' : 'bg-slate-300',
          ].join(' ')}
          title={online ? 'Available' : 'Unavailable'}
          aria-label={online ? 'Doctor is available' : 'Doctor is not available'}
        />
      )}
    </div>
  )
}

export default Avatar
