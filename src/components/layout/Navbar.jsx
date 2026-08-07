// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// Mobile-only bottom tab navigation.
// Hidden on desktop (lg:hidden) because Sidebar takes over.
// Uses a "More" drawer to handle 6 sections gracefully.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Video, Bot, Menu, Search, FileText, User, X, Pill } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Modal } from '@/components/ui' // Reusing Modal as a bottom sheet for simplicity

const PRIMARY_TABS = [
  { id: 'home', label: 'Home', icon: Home, route: ROUTES.DASHBOARD, match: (path) => path === ROUTES.DASHBOARD },
  { id: 'consultations', label: 'Calls', icon: Video, route: '/consultations-list', match: (path) => path.startsWith('/consultations-list') },
  { id: 'ai', label: 'AI Check', icon: Bot, route: ROUTES.AI_SYMPTOM_CHECKER, match: (path) => path === ROUTES.AI_SYMPTOM_CHECKER, highlight: true },
]

const MORE_TABS = [
  { id: 'doctors', label: 'Find Doctor', icon: Search, route: ROUTES.DOCTOR_DIRECTORY },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText, route: '/prescriptions-list' },
  { id: 'medicines', label: 'Medicines', icon: Pill, route: ROUTES.MEDICINES },
  { id: 'profile', label: 'Profile', icon: User, route: ROUTES.PROFILE },
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)

  // Hide entirely on splash, login, or active video call
  const HIDDEN_ROUTES = [ROUTES.SPLASH, ROUTES.LOGIN]
  if (HIDDEN_ROUTES.includes(location.pathname)) return null
  if (location.pathname.startsWith('/consultation/') && location.pathname.length > 15) return null

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/60 safe-area-pb lg:hidden h-[var(--total-bottom-offset)] flex flex-col justify-start"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around w-full h-[var(--nav-height-mobile)]">
          {PRIMARY_TABS.map(({ id, label, icon: Icon, route, match, highlight }) => {
            const isActive = match(location.pathname)

            return (
              <button
                key={id}
                onClick={() => { setShowMore(false); navigate(route) }}
                className="flex flex-col items-center gap-1 py-3 flex-1 relative focus-visible:outline-none"
              >
                {highlight && !isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
                    <Icon size={20} className="text-white" />
                  </div>
                )}
                {!highlight && (
                  <div className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-brand-100' : ''}`}>
                    <Icon size={20} className={isActive ? 'text-brand-600' : 'text-[var(--color-muted)]'} strokeWidth={isActive ? 2.5 : 1.75} />
                  </div>
                )}
                {highlight && isActive && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-brand-100">
                    <Icon size={20} className="text-brand-600" strokeWidth={2.5} />
                  </div>
                )}
                <span className={`text-[10px] font-semibold ${isActive ? 'text-brand-600' : 'text-[var(--color-muted)]'} ${highlight && !isActive ? 'mt-6' : ''}`}>
                  {label}
                </span>
              </button>
            )
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMore(true)}
            className="flex flex-col items-center gap-1 py-3 flex-1 relative focus-visible:outline-none"
          >
            <div className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition-all ${showMore ? 'bg-slate-100' : ''}`}>
              <Menu size={20} className={showMore ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'} strokeWidth={showMore ? 2.5 : 1.75} />
            </div>
            <span className={`text-[10px] font-semibold ${showMore ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More Drawer (Simulated with Modal) */}
      <Modal isOpen={showMore} onClose={() => setShowMore(false)} title="More Options" size="sm">
        <div className="flex flex-col gap-2 pb-4">
          {MORE_TABS.map(({ id, label, icon: Icon, route }) => (
            <button
              key={id}
              onClick={() => {
                setShowMore(false)
                navigate(route)
              }}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
            >
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
                <Icon size={18} className="text-brand-600" />
              </div>
              <span className="font-semibold text-[var(--color-text)]">{label}</span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Navbar
