// src/pages/Dashboard.jsx
// ─────────────────────────────────────────────────────────────
// Home Dashboard — the most important demo screen.
// Judges see this immediately after login. It must:
//   1. Show the breadth of features in one scroll
//   2. Feel genuinely data-rich and alive
//   3. Demonstrate localisation for Nabha, Punjab
//   4. Make the AI Symptom Checker CTA impossible to miss
//
// Layout (top to bottom):
//   • Header — greeting, SOS pill
//   • Health stats banner — blood group, ABHA, quick metrics
//   • Upcoming appointment card
//   • Quick action grid — 4 primary actions
//   • AI Symptom Checker CTA — hero card
//   • Nearby Doctors — horizontal scroll
//   • Nearby PHCs — list
//   • Health Tips — horizontal scroll
//   • Medicine Reminder — card
//   • Recent Prescription — card
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bot, Video, FileText, MapPin, Bell,
  ChevronRight, Pill, Activity, Clock,
  Star, Phone, Navigation, Sparkles,
  TrendingUp, Calendar, WifiOff, X, Copy, Check,
  Users, Network, AlertTriangle, Settings2
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { ROUTES } from '@/constants'
import { Card, Badge, Avatar, Logo } from '@/components/ui'
import { DoctorCard, AppointmentCard, HealthTipCard, SOSButton, LanguageSwitcher } from '@/components/shared'
import { PageWrapper } from '@/components/layout'
import doctorsData  from '@/data/doctors.json'
import phcsData     from '@/data/phcs.json'
import healthTips   from '@/data/healthTips.json'
import prescriptions from '@/data/prescriptions.json'

// ── Quick action grid items ───────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    id:    'book',
    label: 'Book\nAppointment',
    icon:  Calendar,
    color: 'bg-brand-50 text-brand-600',
    route: ROUTES.DOCTOR_DIRECTORY,
  },
  {
    id:    'prescription',
    label: 'My\nPrescription',
    icon:  FileText,
    color: 'bg-purple-50 text-purple-600',
    route: '/prescriptions/rx001',
  },
  {
    id:    'video',
    label: 'Video\nConsult',
    icon:  Video,
    color: 'bg-cyan-50 text-accent-500',
    route: '/consultation/apt001',
  },
  {
    id:    'reminder',
    label: 'Medicine\nReminder',
    icon:  Pill,
    color: 'bg-orange-50 text-orange-500',
    route: ROUTES.MEDICINES,
  },
]

// ── Medicine reminder data (static for prototype) ─────────────────────────────
const MEDICINES = [
  { name: 'Ferrous Sulfate 200mg', time: '8:00 AM',  taken: true  },
  { name: 'Folic Acid 5mg',         time: '8:00 AM',  taken: true  },
  { name: 'Vitamin B12 500mcg',     time: '1:00 PM',  taken: false },
]

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate()
  const { user, activeProfile, appointments, t, isAshaMode, isLowBandwidthMode, toggleAshaMode, toggleLowBandwidthMode, setActiveProfile } = useApp()
  const [showOfflineToast, setShowOfflineToast] = useState(true)

  const upcomingAppointment  = appointments.find((a) => a.status === 'upcoming')
  const availableDoctors     = doctorsData.filter((d) => d.available).slice(0, 5)
  const nearbyPHCs           = phcsData.slice(0, 3)
  const recentPrescription   = prescriptions[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-screen bg-[var(--color-surface)] w-full lg:w-[calc(100%-16rem)] lg:ml-64 transition-all duration-300">
      {/* ── Hero Header ──────────────────────────────────────── */}
      <div
        className="relative pt-12 pb-10 px-5 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #818cf8 100%)',
        }}
      >
        {/* Background mesh accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-300 mix-blend-overlay filter blur-[60px]" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-300 mix-blend-overlay filter blur-[60px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Top row: logo + SOS */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <Logo size="sm" variant="white" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <SOSButton variant="fab" />
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <p className="text-white/80 text-sm font-medium tracking-wide">
            Bringing Quality Healthcare Closer to Every Village.
          </p>
        </div>

        {/* Greeting */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white/70 text-sm font-medium">{greeting},</p>
          </div>
          <h1 className="text-white font-display font-bold text-2xl leading-tight">
            {activeProfile?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-white/60 text-xs mt-1">
            📍 {activeProfile?.village || user?.village}
          </p>
        </div>

        {/* Health card grid */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 pb-2">
          {[
            { label: t('dash.bloodGroup'), value: activeProfile?.bloodGroup || 'O+', icon: '🩸' },
            { label: t('dash.abhaId'),     value: activeProfile?.abhaId && activeProfile.abhaId !== 'Unlinked' ? activeProfile.abhaId.slice(0, 9) + '…' : 'Unlinked', icon: '🪪', copyable: true },
            { label: t('dash.allergies'),  value: activeProfile?.allergies?.[0] || 'None', icon: '⚠️' },
          ].map(({ label, value, icon, copyable }) => (
            <div
              key={label}
              className="px-3 py-3.5 rounded-2xl flex flex-col justify-center relative active:scale-95 transition-all hover:bg-white/20 cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 24px -1px rgba(0,0,0,0.05)'
              }}
              onClick={() => {
                if (copyable) navigator.clipboard.writeText(activeProfile?.abhaId || '')
              }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="text-[10px] text-white/90 font-medium flex items-center gap-1.5 leading-none">{icon} {label}</p>
                {copyable && <Copy size={12} className="text-white/60" />}
              </div>
              <p className="text-white text-sm font-bold mt-1.5 tracking-wide leading-none drop-shadow-sm">{value}</p>
            </div>
          ))}
        </div>


        {/* PM-JAY Scheme Banner */}
        {activeProfile?.abhaId && activeProfile.abhaId !== 'Unlinked' && (
          <div className="relative z-10 mt-3 bg-green-500/20 border border-green-400/30 backdrop-blur-md rounded-xl p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center shrink-0">
              <Check size={16} className="text-green-300" />
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-tight">PM-JAY Eligible (Ayushman Bharat)</p>
              <p className="text-white/70 text-[10px] mt-0.5">Free treatment up to ₹5L/year at empanelled hospitals.</p>
            </div>
          </div>
        )}

        {/* Wave separator */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="block w-full h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.25,32.32,126.9,45.2,199.16,52.3,240.24,56.34,281.33,59.34,321.39,56.44Z" fill="var(--color-surface)"></path>
          </svg>
        </div>
      </div>

      {/* ── Offline Mode Toast ───────────────────────────────── */}
      {showOfflineToast && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 py-2.5 flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center gap-2 text-orange-700">
            <WifiOff size={14} />
            <p className="text-xs font-semibold">Offline Mode. Showing cached data.</p>
          </div>
          <button onClick={() => setShowOfflineToast(false)} className="text-orange-500 hover:text-orange-700">
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Page content ─────────────────────────────────────── */}
      <div className="px-4 pb-28 lg:pb-12 max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8 lg:mt-6 mt-4">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* ── ASHA Mode / Family Switcher Banner ───────────────── */}
          {(isAshaMode || user?.family?.length > 0) && (
            <section className={isAshaMode ? "mt-4 lg:mt-0" : "mt-2 lg:mt-0"}>
              {isAshaMode ? (
                <div className="bg-purple-600 rounded-2xl p-4 shadow-md flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Network size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-200">ASHA Worker Mode</p>
                      <p className="text-sm font-bold mt-0.5">Consulting for: {activeProfile?.name}</p>
                    </div>
                  </div>
                  <button onClick={toggleAshaMode} className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <Users size={14} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-600">Family Members</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    <button 
                      onClick={() => setActiveProfile(user)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${activeProfile?.id === user?.id ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                    >
                      <span className="text-xs font-bold">{user?.name?.split(' ')[0]}</span>
                    </button>
                    {user?.family?.map(member => (
                      <button 
                        key={member.id}
                        onClick={() => setActiveProfile(member)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${activeProfile?.id === member.id ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                      >
                        <span className="text-xs font-bold">{member.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── AI Symptom Checker CTA ─────────────────────────── */}
          <section className="mt-5 lg:mt-0">
            <button
              id="ai-checker-cta"
              onClick={() => navigate(ROUTES.AI_SYMPTOM_CHECKER)}
              className="w-full group cursor-pointer active:scale-[0.98] transition-all duration-300 hover:shadow-lg rounded-3xl"
            >
              <div
                className="relative rounded-3xl p-5 overflow-hidden text-left shadow-md border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                }}
              >
                {/* Decorative mesh inside AI card */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-50">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500 rounded-full mix-blend-screen filter blur-[40px] animate-pulse-glow" />
                  <div className="absolute -bottom-10 right-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-[40px] opacity-60" />
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors shadow-inner">
                    <Bot size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-display font-bold text-lg">{t('dash.aiTitle')}</p>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-brand-200 bg-brand-500/30 px-2 py-0.5 rounded-full border border-brand-400/20">
                        Gemini
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs lg:text-sm leading-relaxed max-w-[85%]">
                      {t('dash.aiSubtitle')}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-brand-300 text-xs font-semibold">
                      <Sparkles size={12} />
                      <span>{t('dash.aiAction')}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </section>

          {/* ── Today's Agenda (Predictive UI) ───────────────────── */}
          <section>
            <SectionHeader title="Today's Agenda" icon={<Calendar size={14} />} />
            <div className="flex flex-col gap-3 mt-3">
              {/* Appointments */}
              {upcomingAppointment ? (
                <AppointmentCard appointment={upcomingAppointment} mode="full" />
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Calendar size={18} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">No upcoming visits</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">Feeling unwell? Talk to our AI.</p>
                    </div>
                  </div>
                  <button onClick={() => navigate(ROUTES.AI_SYMPTOM_CHECKER)} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-brand-600 shadow-sm active:scale-95 transition-transform whitespace-nowrap">
                    Check Symptoms
                  </button>
                </div>
              )}

              {/* Medicine - Next Dose */}
              {MEDICINES.filter(m => !m.taken).length > 0 ? (
                (() => {
                  const nextMed = MEDICINES.filter(m => !m.taken)[0]
                  return (
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                           <Pill size={18} className="text-orange-500" />
                         </div>
                         <div className="min-w-0 pr-2">
                           <p className="text-[10px] uppercase tracking-wider text-orange-600 font-bold mb-0.5">Next dose scheduled</p>
                           <p className="text-[13px] font-bold text-orange-900 truncate">{nextMed.name} <span className="font-normal text-orange-700/50 mx-1">·</span> {nextMed.time}</p>
                         </div>
                       </div>
                       <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all whitespace-nowrap shrink-0">
                         Mark Taken
                       </button>
                    </div>
                  )
                })()
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Pill size={18} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">No medicines scheduled</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">Add a prescription to get reminders.</p>
                    </div>
                  </div>
                  <button onClick={() => navigate(ROUTES.MEDICINES)} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-brand-600 shadow-sm active:scale-95 transition-transform whitespace-nowrap">
                    Add Medicine
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── Quick Actions ─────────────────────────────────── */}
          <section>
            <SectionHeader title={t('dash.quickActions')} />
            <div className="grid grid-cols-4 gap-3 mt-4">
              {QUICK_ACTIONS.map(({ id, label, icon: Icon, color, route }) => (
                <button
                  key={id}
                  id={`quick-action-${id}`}
                  onClick={() => navigate(route)}
                  className="flex flex-col items-center gap-2.5 group cursor-pointer"
                >
                  <div className={[
                    'w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-2xl flex items-center justify-center',
                    'bg-white border border-slate-100',
                    'shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300',
                    'group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group-hover:-translate-y-1',
                    'group-active:scale-95',
                    color.split(' ')[1] // Extract just the text color for the icon
                  ].join(' ')}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] lg:text-xs font-semibold text-slate-600 text-center leading-tight whitespace-pre-line tracking-tight">
                    {t(`action.${id}`) || label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ── Nearby Doctors ───────────────────────────────────── */}
          <section>
            <SectionHeader
              title={t('dash.doctors')}
              icon={<Star size={14} />}
              action={{ label: t('dash.seeAll'), onClick: () => navigate(ROUTES.DOCTOR_DIRECTORY) }}
            />
            <div
              className="flex gap-3 mt-3 overflow-x-auto pb-2 relative"
              style={{ 
                scrollbarWidth: 'none',
                WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
              }}
            >
              {availableDoctors.length > 0 ? availableDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} mode="compact" />
              )) : (
                <div className="w-full bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center">
                  <p className="text-xs text-slate-500 font-medium">Searching for nearby doctors...</p>
                </div>
              )}
            </div>
          </section>

          {/* ── Health Tips ──────────────────────────────────────── */}
          <section className="mt-2">
            <SectionHeader title={t('dash.healthTips')} />
            <div
              className="flex gap-3 mt-4 overflow-x-auto pb-2 relative"
              style={{ 
                scrollbarWidth: 'none',
                WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
              }}
            >
              {healthTips.map((tip) => (
                <HealthTipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (Side Content) */}
        <div className="lg:col-span-4 flex flex-col gap-6 mt-6 lg:mt-0">
          
          {/* ── Nearby PHCs ───────────────────────────────────────── */}
          <section>
            <SectionHeader
              title={t('dash.phcs')}
              icon={<Navigation size={14} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-3">
              {nearbyPHCs.length > 0 ? nearbyPHCs.map((phc) => (
                <PHCCard key={phc.id} phc={phc} />
              )) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Navigation size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">No PHCs nearby</p>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">We couldn't find a PHC within 10km.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── Recent Prescription ──────────────────────────────── */}
          <section>
            <SectionHeader
              title={t('dash.recentRx')}
              icon={<FileText size={14} />}
              action={{ label: t('dash.viewAll'), onClick: () => navigate(ROUTES.PRESCRIPTIONS_LIST) }}
            />
            {recentPrescription ? (
              <Card
                interactive
                className="mt-3 p-5"
                onClick={() => navigate(`/prescriptions/${recentPrescription.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-text)]">
                      {recentPrescription.diagnosis}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">
                      {recentPrescription.doctorName} · {recentPrescription.date}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--color-muted)]" />
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {recentPrescription.medicines.slice(0, 2).map((m, i) => (
                    <Badge key={i} variant="primary" size="xs">{m.name.split(' ')[0]}</Badge>
                  ))}
                  {recentPrescription.medicines.length > 2 && (
                    <Badge variant="default" size="xs">+{recentPrescription.medicines.length - 2} more</Badge>
                  )}
                </div>
              </Card>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 flex items-center gap-3 mt-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <FileText size={18} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">No prescriptions yet</p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">They will appear here after your visit.</p>
                </div>
              </div>
            )}
          </section>

        </div>

      </div>

      {/* ── Demo Settings FAB ───────────────────────────────── */}
      <div className="fixed bottom-[calc(var(--total-bottom-offset)+1rem)] right-4 lg:bottom-8 lg:right-8 z-50 flex flex-col gap-2 transition-all duration-300">
        <button
          onClick={toggleLowBandwidthMode}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-bold text-xs transition-all ${isLowBandwidthMode ? 'bg-orange-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
        >
          <WifiOff size={16} />
          {isLowBandwidthMode ? 'Low Bandwidth: ON' : 'Low Bandwidth: OFF'}
        </button>
        <button
          onClick={toggleAshaMode}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-bold text-xs transition-all ${isAshaMode ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
        >
          <Network size={16} />
          {isAshaMode ? 'ASHA Mode: ON' : 'ASHA Mode: OFF'}
        </button>
      </div>

    </div>
  )
}

// ── Section Header ─────────────────────────────────────────────────────────────
const SectionHeader = ({ title, action }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-4 bg-brand-500 rounded-full" />
      <h2 className="text-base font-display font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    {action && (
      <button
        onClick={action.onClick}
        className="flex items-center gap-0.5 text-xs font-bold text-brand-600 hover:text-brand-800 transition-colors"
      >
        {action.label}
        <ChevronRight size={14} />
      </button>
    )}
  </div>
)

// ── PHC Card ───────────────────────────────────────────────────────────────────

const PHCCard = ({ phc }) => (
  <Card className="p-4 border-2 border-transparent transition-colors" style={phc.isJanAushadhi ? { borderColor: 'rgba(34, 197, 94, 0.3)', backgroundColor: '#f0fdf4' } : {}}>
    <div className="flex items-start gap-3">
      <div className={[
        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
        phc.isJanAushadhi ? 'bg-green-100' : (phc.open ? 'bg-success-50' : 'bg-slate-100'),
      ].join(' ')}>
        {phc.isJanAushadhi ? <Pill size={18} className="text-green-600" /> : <Navigation size={18} className={phc.open ? 'text-success-500' : 'text-slate-400'} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">{phc.name}</h3>
          {phc.isJanAushadhi ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-green-100 text-green-700 border border-green-200 shrink-0 whitespace-nowrap">GENERIC MEDS</span>
          ) : (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold border shrink-0 whitespace-nowrap ${phc.open ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              {phc.open ? 'OPEN' : 'CLOSED'}
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">{phc.address}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <MapPin size={11} className="text-brand-500" />
            <span className="text-xs text-brand-600 font-medium">{phc.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} className="text-[var(--color-muted)]" />
            <span className="text-xs text-[var(--color-muted)]">{phc.timing}</span>
          </div>
        </div>
        {/* Services */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {phc.services.slice(0, 3).map((s) => (
            <span key={s} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">{s}</span>
          ))}
        </div>
      </div>
    </div>
    {/* Call button */}
    <a
      href={`tel:${phc.phone}`}
      id={`call-phc-${phc.id}`}
      className={`flex items-center gap-2 mt-3 p-2.5 rounded-xl text-xs font-semibold transition-colors ${phc.isJanAushadhi ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Phone size={13} />
      Call: {phc.phone}
    </a>
  </Card>
)

export default Dashboard
