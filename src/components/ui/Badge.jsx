// src/components/ui/Badge.jsx
// ─────────────────────────────────────────────────────────────
// Compact label for status, specialization, availability, urgency level.
// Used in doctor cards, appointments, AI results.
// ─────────────────────────────────────────────────────────────

const VARIANTS = {
  default:   'bg-slate-100 text-slate-600',
  primary:   'bg-brand-100 text-brand-700',
  success:   'bg-success-50 text-success-600 border border-success-500/20',
  warning:   'bg-yellow-50 text-yellow-700 border border-yellow-200',
  danger:    'bg-emergency-50 text-emergency-600 border border-emergency-500/20',
  orange:    'bg-orange-50 text-orange-600 border border-orange-200',
  purple:    'bg-purple-50 text-purple-600 border border-purple-200',
  cyan:      'bg-cyan-50 text-accent-500 border border-cyan-200',
  available: 'bg-success-50 text-success-600 border border-success-500/20',
  busy:      'bg-slate-100 text-slate-500',
}

const SIZES = {
  xs: 'text-[10px] px-2 py-0.5 rounded-md',
  sm: 'text-xs   px-2.5 py-1 rounded-lg',
  md: 'text-sm   px-3 py-1.5 rounded-lg',
}

/**
 * @param {object} props
 * @param {'default'|'primary'|'success'|'warning'|'danger'|'orange'|'purple'|'cyan'|'available'|'busy'} [props.variant='default']
 * @param {'xs'|'sm'|'md'} [props.size='sm']
 * @param {React.ReactNode} [props.icon] - Optional icon before text
 * @param {boolean} [props.dot=false] - Show a pulsing dot indicator
 * @param {string} [props.className]
 */
const Badge = ({
  variant = 'default',
  size = 'sm',
  icon,
  dot = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-semibold',
        VARIANTS[variant] || VARIANTS.default,
        SIZES[size] || SIZES.sm,
        className,
      ].join(' ')}
      {...props}
    >
      {dot && (
        <span className={[
          'w-1.5 h-1.5 rounded-full shrink-0',
          variant === 'success' || variant === 'available' ? 'bg-success-500 animate-pulse' : '',
          variant === 'danger' ? 'bg-emergency-500 animate-pulse' : '',
          variant === 'warning' ? 'bg-yellow-500' : '',
          !['success', 'available', 'danger', 'warning'].includes(variant) ? 'bg-current' : '',
        ].join(' ')} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
