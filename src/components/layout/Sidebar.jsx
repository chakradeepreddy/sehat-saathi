// src/components/layout/Sidebar.jsx
// ─────────────────────────────────────────────────────────────
// Desktop-only Left Sidebar Navigation
// Provides all 6 top-level sections comfortably.
// ─────────────────────────────────────────────────────────────

import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, Bot, Video, FileText, User, LogOut, Pill, Users, Activity, BarChart2 } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Logo } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/context/RoleContext'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useApp()
  const { isAsha } = useRole()

  const SIDEBAR_ITEMS = isAsha ? [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      route: ROUTES.ASHA_DASHBOARD,
      match: (path) => path === ROUTES.ASHA_DASHBOARD,
    },
    {
      id: 'villagers',
      label: 'Villagers',
      icon: Users,
      route: ROUTES.ASHA_VILLAGERS,
      match: (path) => path.startsWith(ROUTES.ASHA_VILLAGERS),
    },
    {
      id: 'visits',
      label: 'Visits',
      icon: Activity,
      route: ROUTES.ASHA_VISITS,
      match: (path) => path.startsWith(ROUTES.ASHA_VISITS),
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart2,
      route: ROUTES.ASHA_REPORTS,
      match: (path) => path.startsWith(ROUTES.ASHA_REPORTS),
    },
    {
      id: 'ai',
      label: 'AI Insights',
      icon: Bot,
      route: ROUTES.ASHA_INSIGHTS,
      match: (path) => path === ROUTES.ASHA_INSIGHTS,
      highlight: true,
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      route: ROUTES.ASHA_PROFILE,
      match: (path) => path === ROUTES.ASHA_PROFILE,
    },
  ] : [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      route: ROUTES.DASHBOARD,
      match: (path) => path === ROUTES.DASHBOARD,
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: Video,
      route: '/consultations-list',
      match: (path) => path.startsWith('/consultations-list') || path.startsWith('/consultation/'),
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      icon: FileText,
      route: '/prescriptions-list',
      match: (path) => path.startsWith('/prescriptions-list') || path.startsWith('/prescription'),
    },
    {
      id: 'doctors',
      label: 'Find a Doctor',
      icon: Search,
      route: ROUTES.DOCTOR_DIRECTORY,
      match: (path) => path.startsWith('/doctors'),
    },
    {
      id: 'ai',
      label: 'AI Symptom Checker',
      icon: Bot,
      route: ROUTES.AI_SYMPTOM_CHECKER,
      match: (path) => path === ROUTES.AI_SYMPTOM_CHECKER,
      highlight: true,
    },
    {
      id: 'medicines',
      label: 'Medicines',
      icon: Pill,
      route: ROUTES.MEDICINES,
      match: (path) => path === ROUTES.MEDICINES,
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      route: ROUTES.PROFILE,
      match: (path) => path === ROUTES.PROFILE,
    },
  ]

  // Pages where we might not want the sidebar even on desktop (like splash/login/role selection)
  const HIDDEN_ROUTES = [ROUTES.SPLASH, ROUTES.LOGIN, ROUTES.ROLE_SELECTION]
  if (HIDDEN_ROUTES.includes(location.pathname)) return null
  if (location.pathname.startsWith('/consultation/') && location.pathname.length > 15) return null // Hide on active video call

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[var(--color-border)] z-40 flex-col">
      {/* Brand */}
      <div className="h-14 flex items-center px-6 border-b border-[var(--color-border)]">
        <div className="cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD)}>
          <Logo size="sm" />
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5">
        {SIDEBAR_ITEMS.map(({ id, label, icon: Icon, route, match, highlight }) => {
          const isActive = match(location.pathname)

          return (
            <button
              key={id}
              onClick={() => navigate(route)}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full text-left',
                isActive
                  ? 'bg-brand-50 text-brand-700 font-bold'
                  : 'text-[var(--color-text-soft)] hover:bg-slate-50 hover:text-[var(--color-text)] font-semibold',
                highlight && !isActive ? 'ring-1 ring-brand-200 shadow-sm' : ''
              ].join(' ')}
            >
              <div className={[
                'w-8 h-8 rounded-lg flex items-center justify-center',
                isActive ? 'bg-brand-100' : 'bg-transparent',
                highlight && !isActive ? 'bg-brand-gradient text-white' : ''
              ].join(' ')}>
                <Icon size={18} className={highlight && !isActive ? 'text-white' : isActive ? 'text-brand-600' : 'text-[var(--color-muted)]'} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-sm">{label}</span>
            </button>
          )
        })}
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <LogOut size={18} />
          </div>
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
