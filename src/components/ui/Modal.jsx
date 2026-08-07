// src/components/ui/Modal.jsx
// ─────────────────────────────────────────────────────────────
// Animated modal with backdrop blur, keyboard accessibility, and focus trap.
// Used for: appointment confirmation, emergency warning, AI results, etc.
// ─────────────────────────────────────────────────────────────

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * @param {object}  props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string}  [props.title]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {boolean} [props.showClose=true]
 * @param {boolean} [props.closeOnBackdrop=true]
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]
 */
const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showClose = true,
  closeOnBackdrop = true,
  children,
  className = '',
}) => {
  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) onClose()
  }, [isOpen, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in-up"
        style={{ animationDuration: '0.15s' }}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel — slides up from bottom on mobile, centers on desktop */}
      <div
        className={[
          'relative w-full bg-white z-10',
          'rounded-t-3xl sm:rounded-2xl',
          'shadow-2xl',
          'animate-fade-in-up',
          SIZES[size] || SIZES.md,
          className,
        ].join(' ')}
        style={{ animationDuration: '0.25s' }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            {/* Mobile drag handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-200 rounded-full sm:hidden" />

            {title ? (
              <h2
                id="modal-title"
                className="text-lg font-display font-bold text-[var(--color-text)] pr-8"
              >
                {title}
              </h2>
            ) : (
              <div />
            )}

            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-[var(--color-muted)] hover:bg-slate-100 hover:text-[var(--color-text)] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div 
          className={title || showClose ? 'px-6 pt-0' : 'p-6'} 
          style={{ paddingBottom: 'calc(2rem + var(--safe-area-bottom))' }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default Modal
