// src/components/shared/SOSButton.jsx
// ─────────────────────────────────────────────────────────────
// Emergency SOS button — always visible on the Dashboard.
// Real impact: in a genuine emergency, this is the most important feature.
// Calls 108 (Indian ambulance) — a real functional feature, not just UI.
// ─────────────────────────────────────────────────────────────

import { Phone, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

const EMERGENCY_NUMBERS = [
  { label: '🚑 Ambulance',      number: '108', description: 'National Emergency Ambulance' },
  { label: '🚔 Police',         number: '100', description: 'Police Emergency' },
  { label: '🚒 Fire Brigade',   number: '101', description: 'Fire Emergency' },
  { label: '💊 Poison Control', number: '1800-116-117', description: 'Poison Control (Toll Free)' },
]

/**
 * @param {object}  props
 * @param {'fab'|'card'|'inline'} [props.variant='fab']
 *   - fab: Floating Action Button (top-right on Dashboard)
 *   - card: Full card with description
 *   - inline: Compact inline button
 */
const SOSButton = ({ variant = 'fab' }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCall = (number) => {
    window.location.href = `tel:${number}`
  }

  if (variant === 'fab') {
    return (
      <>
        <button
          id="sos-fab-button"
          onClick={() => setShowModal(true)}
          aria-label="Emergency SOS - Call for help"
          className={[
            'flex items-center gap-1.5 px-3 py-1.5',
            'bg-emergency-500 text-white rounded-full',
            'text-xs font-bold shadow-lg',
            'animate-pulse-glow',
            'hover:bg-emergency-600 active:scale-95 transition-all duration-150',
          ].join(' ')}
        >
          <Phone size={13} />
          SOS
        </button>

        <SOSModal isOpen={showModal} onClose={() => setShowModal(false)} onCall={handleCall} />
      </>
    )
  }

  if (variant === 'card') {
    return (
      <>
        <div
          className="bg-emergency-50 border border-emergency-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-emergency-100 transition-colors"
          onClick={() => setShowModal(true)}
          role="button"
          id="sos-card-button"
          aria-label="Emergency SOS"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
        >
          <div className="w-12 h-12 bg-emergency-500 rounded-xl flex items-center justify-center animate-emergency shrink-0">
            <AlertTriangle size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-emergency-600">Emergency SOS</p>
            <p className="text-xs text-emergency-500 mt-0.5">
              Tap to call 108 ambulance or emergency services
            </p>
          </div>
        </div>

        <SOSModal isOpen={showModal} onClose={() => setShowModal(false)} onCall={handleCall} />
      </>
    )
  }

  return null
}

// ── SOS Modal ─────────────────────────────────────────────────────────────────
const SOSModal = ({ isOpen, onClose, onCall }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Emergency Services"
    size="sm"
  >
    <div className="flex flex-col gap-3">
      {/* Warning banner */}
      <div className="bg-emergency-50 border border-emergency-200 rounded-xl p-3 flex gap-2 items-center mb-1">
        <AlertTriangle size={16} className="text-emergency-500 shrink-0" />
        <p className="text-xs text-emergency-600 font-medium">
          In a life-threatening emergency, call 108 immediately.
        </p>
      </div>

      {EMERGENCY_NUMBERS.map(({ label, number, description }) => (
        <button
          key={number}
          id={`sos-call-${number}`}
          onClick={() => onCall(number)}
          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emergency-300 hover:bg-emergency-50 transition-all text-left"
        >
          <div className="w-10 h-10 bg-emergency-100 rounded-xl flex items-center justify-center shrink-0">
            <Phone size={16} className="text-emergency-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--color-text)]">{label}</p>
            <p className="text-xs text-[var(--color-muted)]">{description}</p>
          </div>
          <span className="text-base font-bold text-emergency-600">{number}</span>
        </button>
      ))}

      <Button variant="ghost" fullWidth size="sm" onClick={onClose} className="mt-1">
        Cancel
      </Button>
    </div>
  </Modal>
)

export default SOSButton
