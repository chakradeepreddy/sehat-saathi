// src/components/shared/AIDisclaimer.jsx
// ─────────────────────────────────────────────────────────────
// MANDATORY: Must appear on every screen showing AI-generated content.
// This is a compliance and safety requirement, not just a UI element.
// The AI_DISCLAIMER constant is the canonical text — never hardcode it inline.
// ─────────────────────────────────────────────────────────────

import { Info } from 'lucide-react'
import { AI_DISCLAIMER } from '@/constants'

/**
 * @param {object}  props
 * @param {'inline'|'banner'} [props.variant='inline']
 * @param {string}  [props.className]
 */
const AIDisclaimer = ({ variant = 'inline', className = '' }) => {
  if (variant === 'banner') {
    return (
      <div
        className={[
          'w-full flex gap-3 items-start',
          'bg-brand-50 border border-brand-200 rounded-xl p-4',
          className,
        ].join(' ')}
        role="note"
        aria-label="AI disclaimer"
      >
        <Info size={16} className="text-brand-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-brand-700 mb-0.5">
            Preliminary AI Assistance
          </p>
          <p className="text-xs text-brand-600 leading-relaxed">
            {AI_DISCLAIMER}
          </p>
        </div>
      </div>
    )
  }

  return (
    <p
      className={[
        'flex items-start gap-1.5 text-[11px] text-[var(--color-muted)] leading-relaxed',
        className,
      ].join(' ')}
      role="note"
    >
      <Info size={11} className="mt-0.5 shrink-0" />
      {AI_DISCLAIMER}
    </p>
  )
}

export default AIDisclaimer
