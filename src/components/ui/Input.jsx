// src/components/ui/Input.jsx
// ─────────────────────────────────────────────────────────────
// Form input with label, helper text, error state, and icon slots.
// Also exports Textarea for multi-line input (symptom checker).
// Large touch targets — critical for mobile + rural users.
// ─────────────────────────────────────────────────────────────

import { forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'

// ── Input ────────────────────────────────────────────────────────────────────
const Input = forwardRef(({
  label,
  helper,
  error,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  id,
  required,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const hasError = Boolean(error)

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[var(--color-text)]"
        >
          {label}
          {required && <span className="text-emergency-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[var(--color-muted)] pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          className={[
            'w-full h-12 rounded-xl border bg-white text-[var(--color-text)] text-sm',
            'placeholder:text-[var(--color-muted)] transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400',
            leftIcon  ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            hasError
              ? 'border-emergency-400 bg-emergency-50/30 focus:ring-emergency-300'
              : 'border-[var(--color-border)] hover:border-brand-300',
            className,
          ].join(' ')}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 text-[var(--color-muted)]">
            {rightIcon}
          </div>
        )}
      </div>

      {hasError && (
        <p id={`${inputId}-error`} className="flex items-center gap-1.5 text-xs text-emergency-500 font-medium">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {!hasError && helper && (
        <p id={`${inputId}-helper`} className="text-xs text-[var(--color-muted)]">
          {helper}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// ── Textarea ─────────────────────────────────────────────────────────────────
export const Textarea = forwardRef(({
  label,
  helper,
  error,
  className = '',
  containerClassName = '',
  id,
  required,
  rows = 4,
  ...props
}, ref) => {
  const inputId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const hasError = Boolean(error)

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[var(--color-text)]"
        >
          {label}
          {required && <span className="text-emergency-500 ml-0.5">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        aria-invalid={hasError}
        className={[
          'w-full rounded-xl border bg-white text-[var(--color-text)] text-sm p-4',
          'placeholder:text-[var(--color-muted)] transition-all duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400',
          hasError
            ? 'border-emergency-400 bg-emergency-50/30'
            : 'border-[var(--color-border)] hover:border-brand-300',
          className,
        ].join(' ')}
        {...props}
      />

      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-emergency-500 font-medium">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      {!hasError && helper && (
        <p className="text-xs text-[var(--color-muted)]">{helper}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Input
