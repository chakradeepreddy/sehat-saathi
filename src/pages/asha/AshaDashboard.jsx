import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, AlertTriangle, Clock, MapPin,
  ChevronRight, Activity, Plus, Search,
  Calendar, FileText, CheckCircle2, Navigation
} from 'lucide-react'
import { ROUTES } from '@/constants'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/context/RoleContext'
import { Card, Badge, Avatar, Logo } from '@/components/ui'
import { SOSButton, LanguageSwitcher } from '@/components/shared'
import ashaStats from '@/data/ashaStats.json'

const QUICK_ACTIONS = [
  {
    id: 'add_villager',
    label: 'Add\nVillager',
    icon: Plus,
    color: 'bg-green-50 text-green-600',
    route: ROUTES.ASHA_VILLAGERS,
  },
  {
    id: 'log_visit',
    label: 'Log\nVisit',
    icon: Activity,
    color: 'bg-brand-50 text-brand-600',
    route: ROUTES.ASHA_VISITS,
  },
  {
    id: 'reports',
    label: 'Generate\nReport',
    icon: FileText,
    color: 'bg-purple-50 text-purple-600',
    route: ROUTES.ASHA_REPORTS,
  },
  {
    id: 'search',
    label: 'Find\nVillager',
    icon: Search,
    color: 'bg-orange-50 text-orange-500',
    route: ROUTES.ASHA_VILLAGERS,
  },
]

const AshaDashboard = () => {
  const navigate = useNavigate()
  const { user, t } = useApp()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-screen bg-[var(--color-surface)] w-full lg:w-[calc(100%-16rem)] lg:ml-64 transition-all duration-300">
      {/* ── Hero Header ──────────────────────────────────────── */}
      <div
        className="relative pt-12 pb-10 px-5 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #d8b4fe 100%)', // Purple gradient for ASHA
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-fuchsia-300 mix-blend-overlay filter blur-[60px]" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-300 mix-blend-overlay filter blur-[60px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Top row */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <Logo size="sm" variant="white" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <SOSButton variant="fab" />
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <p className="text-white/80 text-sm font-medium tracking-wide">
            ASHA Worker Portal
          </p>
        </div>

        {/* Greeting */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white/70 text-sm font-medium">{greeting},</p>
          </div>
          <h1 className="text-white font-display font-bold text-2xl leading-tight">
            {user?.name?.split(' ')[0] || 'Asha'} 👋
          </h1>
          <p className="text-white/60 text-xs mt-1">
            📍 Assigned Area: Nabha Cluster
          </p>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 pb-2">
          {[
            { label: 'Total Patients', value: ashaStats.totalVillagers, icon: '👥' },
            { label: 'High Risk',      value: ashaStats.highRiskPatients, icon: '⚠️' },
            { label: 'Pending Visits', value: ashaStats.pendingVisits, icon: '🗓️' },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="px-3 py-3.5 rounded-2xl flex flex-col justify-center relative transition-all hover:bg-white/20"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 24px -1px rgba(0,0,0,0.05)'
              }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="text-[10px] text-white/90 font-medium flex items-center gap-1.5 leading-none">{icon} {label}</p>
              </div>
              <p className="text-white text-sm font-bold mt-1.5 tracking-wide leading-none drop-shadow-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Wave separator */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="block w-full h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.25,32.32,126.9,45.2,199.16,52.3,240.24,56.34,281.33,59.34,321.39,56.44Z" fill="var(--color-surface)"></path>
          </svg>
        </div>
      </div>

      <div className="px-4 pb-28 lg:pb-12 max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8 lg:mt-6 mt-4">
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Quick Actions */}
          <section>
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-4 gap-3 mt-4">
              {QUICK_ACTIONS.map(({ id, label, icon: Icon, color, route }) => (
                <button
                  key={id}
                  onClick={() => navigate(route)}
                  className="flex flex-col items-center gap-2.5 group cursor-pointer"
                >
                  <div className={[
                    'w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-2xl flex items-center justify-center',
                    'bg-white border border-slate-100',
                    'shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300',
                    'group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group-hover:-translate-y-1',
                    'group-active:scale-95',
                    color.split(' ')[1]
                  ].join(' ')}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] lg:text-xs font-semibold text-slate-600 text-center leading-tight whitespace-pre-line tracking-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Today's Visits */}
          <section>
            <SectionHeader title="Today's Visits" icon={<Calendar size={14} />} action={{ label: 'View All', onClick: () => navigate(ROUTES.ASHA_VISITS) }} />
            <div className="flex flex-col gap-3 mt-3">
              {ashaStats.todayVisits.map((visit) => (
                <div key={visit.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                   <div className="flex items-center gap-3 min-w-0 flex-1">
                     <div className="w-10 h-10 shrink-0 bg-brand-50 rounded-full flex items-center justify-center">
                       <MapPin size={18} className="text-brand-500" />
                     </div>
                     <div className="min-w-0 pr-2">
                       <p className="text-[13px] font-bold text-slate-900 truncate">{visit.name}</p>
                       <p className="text-[11px] text-slate-500 mt-0.5 truncate">{visit.type} • {visit.condition}</p>
                     </div>
                   </div>
                   <div className="flex flex-col items-end shrink-0">
                     <span className="text-xs font-bold text-slate-700">{visit.time}</span>
                     <button className="mt-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-xs font-bold transition-all">Start</button>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Critical Alerts */}
          <section>
            <SectionHeader title="Recent Alerts" icon={<AlertTriangle size={14} />} />
            <div className="flex flex-col gap-3 mt-3">
              {ashaStats.recentAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-2xl p-4 flex items-start gap-3 shadow-sm ${alert.type === 'critical' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${alert.type === 'critical' ? 'bg-red-100' : 'bg-orange-100'}`}>
                    <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-500' : 'text-orange-500'} />
                  </div>
                  <div>
                    <p className={`text-[13px] font-bold ${alert.type === 'critical' ? 'text-red-900' : 'text-orange-900'}`}>{alert.message}</p>
                    <p className={`text-[11px] mt-1 ${alert.type === 'critical' ? 'text-red-700' : 'text-orange-700'}`}>{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
        
        {/* Right side logic for desktop */}
        <div className="lg:col-span-4 flex flex-col gap-6 mt-6 lg:mt-0">
           {/* We can add Target completion card here */}
           <section>
             <SectionHeader title="Monthly Target" icon={<CheckCircle2 size={14} />} />
             <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mt-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">Visits Completed</span>
                  <span className="text-sm font-bold text-brand-600">{ashaStats.completedVisits} / {ashaStats.monthlyTarget}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                   <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(ashaStats.completedVisits/ashaStats.monthlyTarget)*100}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">Great job! You are on track to meet your monthly goal.</p>
             </div>
           </section>
        </div>
      </div>
    </div>
  )
}

const SectionHeader = ({ title, icon, action }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-4 bg-purple-500 rounded-full" />
      <h2 className="text-base font-display font-bold text-slate-800 tracking-tight">{title}</h2>
      {icon && <span className="text-slate-400">{icon}</span>}
    </div>
    {action && (
      <button
        onClick={action.onClick}
        className="flex items-center gap-0.5 text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors"
      >
        {action.label}
        <ChevronRight size={14} />
      </button>
    )}
  </div>
)

export default AshaDashboard
