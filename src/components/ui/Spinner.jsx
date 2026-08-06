// src/components/ui/Spinner.jsx
// ─────────────────────────────────────────────────────────────
// Loading spinner and skeleton loader.
// ─────────────────────────────────────────────────────────────

import { Loader2 } from 'lucide-react'

const SIZES = {
  sm:  'w-4 h-4',
  md:  'w-6 h-6',
  lg:  'w-8 h-8',
  xl:  'w-12 h-12',
}

const COLORS = {
  primary: 'text-brand-500',
  white:   'text-white',
  muted:   'text-[var(--color-muted)]',
}

/**
 * Inline spinner — replaces Loader2 with consistent sizing
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'primary'|'white'|'muted'} [props.color='primary']
 */
export const Spinner = ({ size = 'md', color = 'primary', className = '' }) => (
  <Loader2
    className={[
      'animate-spin',
      SIZES[size] || SIZES.md,
      COLORS[color] || COLORS.primary,
      className,
    ].join(' ')}
  />
)

/**
 * Full-page centered loading state
 */
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-soft">
    <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
      <span className="text-white font-display font-bold text-xl">SS</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="lg" color="primary" />
      <p className="text-sm text-[var(--color-text-soft)] font-medium">{message}</p>
    </div>
  </div>
)

/**
 * Skeleton block for loading states
 * @param {string} [props.className] - Pass width/height classes
 */
export const Skeleton = ({ className = '' }) => (
  <div className={`animate-shimmer rounded-xl ${className}`} />
)

/**
 * Skeleton card — used in doctor directory loading state
 */
export const DoctorCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm">
    <div className="flex gap-3">
      <Skeleton className="w-14 h-14 rounded-full" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
    <div className="mt-4 flex gap-2">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 flex-1" />
    </div>
  </div>
)

export default Spinner
