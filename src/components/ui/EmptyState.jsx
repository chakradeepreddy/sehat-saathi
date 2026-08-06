// src/components/ui/EmptyState.jsx
// ─────────────────────────────────────────────────────────────
// Consistent empty state — used when no doctors, no appointments,
// no prescriptions, etc. Never shows a blank white screen.
// ─────────────────────────────────────────────────────────────

/**
 * @param {object} props
 * @param {React.ReactNode} props.icon   - Lucide icon element
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.action] - CTA button
 * @param {string} [props.className]
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6',
        className,
      ].join(' ')}
    >
      {/* Icon container */}
      <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-4 text-brand-400">
        {icon}
      </div>

      <h3 className="text-lg font-display font-bold text-[var(--color-text)] mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-[var(--color-text-soft)] max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}

      {action && action}
    </div>
  )
}

export default EmptyState
