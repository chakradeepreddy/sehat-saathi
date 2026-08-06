// src/components/layout/TopBar.jsx
// ─────────────────────────────────────────────────────────────
// Page-level top bar with back button, title, and optional right action.
// Used on inner pages (Doctor Profile, Book Appointment, Prescription, etc.)
// The Dashboard has its own custom header — this is for secondary screens.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * @param {object} props
 * @param {string}  [props.title]
 * @param {boolean} [props.showBack=true]
 * @param {Function} [props.onBack]      - Custom back handler (defaults to navigate(-1))
 * @param {React.ReactNode} [props.right] - Right-side action (e.g. share, filter button)
 * @param {boolean} [props.transparent=false] - For use over hero images
 * @param {string}  [props.className]
 */
const TopBar = ({
  title,
  showBack = true,
  onBack,
  right,
  transparent = false,
  className = '',
}) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header
      className={[
        'sticky top-0 z-30 flex items-center gap-3 px-4 h-14 w-full lg:w-[calc(100%-16rem)] lg:ml-64 transition-all duration-300',
        transparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]',
        className,
      ].join(' ')}
    >
      {/* Back button */}
      {showBack && (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className={[
            'w-9 h-9 flex items-center justify-center rounded-xl shrink-0',
            'transition-colors duration-150',
            transparent
              ? 'bg-black/20 text-white hover:bg-black/30'
              : 'text-[var(--color-text)] hover:bg-slate-100',
          ].join(' ')}
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Title */}
      {title && (
        <h1 className={[
          'flex-1 text-base font-display font-bold truncate',
          transparent ? 'text-white' : 'text-[var(--color-text)]',
        ].join(' ')}>
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}

      {/* Right action */}
      {right && <div className="shrink-0">{right}</div>}
    </header>
  )
}

export default TopBar
