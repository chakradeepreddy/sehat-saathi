// src/components/ui/Card.jsx
// ─────────────────────────────────────────────────────────────
// Base card component. Variants: default, glass, flat, bordered.
// Every major content block in the app uses this — consistency guaranteed.
// ─────────────────────────────────────────────────────────────

const VARIANTS = {
  default:  'bg-white border border-slate-200 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]',
  glass:    'glass shadow-[var(--shadow-card)]',
  flat:     'bg-slate-50 border border-slate-200',
  bordered: 'bg-white border border-slate-200',
  ghost:    'bg-transparent',
}

/**
 * @param {object} props
 * @param {'default'|'glass'|'flat'|'bordered'|'ghost'} [props.variant='default']
 * @param {boolean} [props.interactive=false] - Adds hover lift + pointer cursor
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Card = ({
  variant = 'default',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={[
        'rounded-[var(--radius-card)] transition-all duration-[300ms] [transition-timing-function:var(--ease-apple)]',
        VARIANTS[variant] || VARIANTS.default,
        interactive ? 'cursor-pointer active:scale-[0.985] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
