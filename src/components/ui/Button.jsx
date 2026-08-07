// src/components/ui/Button.jsx
// ─────────────────────────────────────────────────────────────
// The single Button component used everywhere.
// Variants cover every use case so we never write custom button styles inline.
// Large tap targets by default — critical for rural low-dexterity users.
// ─────────────────────────────────────────────────────────────

import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:   'bg-slate-900 text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-800 active:scale-[0.98] border border-transparent [box-shadow:var(--shadow-inner-btn)]',
  secondary: 'bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-[0.98]',
  ghost:     'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]',
  danger:    'bg-red-500 text-white shadow-sm hover:bg-red-600 active:scale-[0.98] border border-transparent',
  outline:   'border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-[0.98]',
  success:   'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98]',
  soft:      'bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-[0.98]',
}

const SIZES = {
  sm:   'min-h-[36px] h-9 px-3 text-xs gap-1.5',
  md:   'min-h-[44px] h-11 px-4 text-sm gap-2',
  lg:   'min-h-[48px] h-12 px-5 text-sm gap-2 font-medium',
  xl:   'min-h-[56px] h-14 px-6 text-base gap-2.5',
  icon: 'min-h-[44px] min-w-[44px] h-11 w-11 text-sm',
}

/**
 * @param {object}  props
 * @param {'primary'|'secondary'|'ghost'|'danger'|'outline'|'success'|'soft'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'|'xl'|'icon'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className]
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={[
        // Base
        'inline-flex items-center justify-center font-medium rounded-[var(--radius-btn)] tracking-wide',
        'transition-all duration-[250ms] [transition-timing-function:var(--ease-apple)] cursor-pointer select-none',
        'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
        // Variant
        VARIANTS[variant] || VARIANTS.primary,
        // Size
        SIZES[size] || SIZES.md,
        // Full width
        fullWidth ? 'w-full' : '',
        // Disabled
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  )
}

export default Button
