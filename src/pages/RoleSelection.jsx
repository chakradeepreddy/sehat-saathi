import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Logo } from '@/components/ui'
import { User, Stethoscope, Activity } from 'lucide-react'
import { PageWrapper } from '@/components/layout'
import { ROUTES } from '@/constants'
import { useRole } from '@/context/RoleContext'

const RoleSelection = () => {
  const navigate = useNavigate()
  const { setRole } = useRole()
  const [transitionRole, setTransitionRole] = useState(null)
  
  // If splash is currently playing on first load, delay our entrance
  const [isInitialLoad] = useState(() => !sessionStorage.getItem('ss_splash_shown'))
  const [showContent, setShowContent] = useState(!isInitialLoad)

  useEffect(() => {
    if (isInitialLoad) {
      // Splash screen starts fading out at 2.2s.
      // We start our entrance animation slightly after so it feels like a smooth handoff.
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 2400)
      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  const handleRoleSelect = (role) => {
    setTransitionRole(role)
    setTimeout(() => {
      setRole(role)
      if (role === 'DOCTOR') {
        navigate(ROUTES.DOCTOR_LOGIN)
      } else {
        navigate(ROUTES.LOGIN)
      }
    }, 1200) // 1.2s to allow for fade out, logo display, and fade in
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #0c4a6e 0%, #0284c7 55%, #0ea5e9 100%)' }}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl -z-10" />

      {/* TRANSITION OVERLAY */}
      <div 
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          transitionRole ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(145deg, #0c4a6e 0%, #0284c7 55%, #0ea5e9 100%)' }}
      >
        <div className={`flex flex-col items-center transition-all duration-700 delay-150 ${transitionRole ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div 
            className="w-24 h-24 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
            }}
          >
            <Logo size="xl" variant="white" showText={false} iconOnly />
          </div>
          <p className="text-white font-display font-medium text-lg tracking-wide text-center px-6">
            {transitionRole === 'CITIZEN' ? 'Preparing your Citizen Workspace...' : 
             transitionRole === 'DOCTOR' ? 'Loading Doctor Portal...' : 
             'Loading ASHA Operations Dashboard...'}
          </p>
        </div>
      </div>

      <div className={`w-full max-w-sm text-center mb-8 relative z-10 pt-10 transition-all duration-700 ease-out ${
        !showContent ? 'opacity-0 translate-y-8' : 
        transitionRole ? 'opacity-0 scale-95' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        <div 
          className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
          }}
        >
          <Logo size="lg" variant="white" showText={false} iconOnly />
        </div>
        <h1 className="text-[28px] font-display font-bold text-white mb-2 tracking-tight leading-[1.15]">
          Aapki Sehat,<br />Hamari Zimmedari
        </h1>
        <p className="text-white/90 text-sm font-medium px-4 mt-3">
          Select your role to access your personalized healthcare dashboard.
        </p>
      </div>

      <div className={`w-full max-w-md flex flex-col gap-4 relative z-10 transition-all duration-700 delay-100 ease-out ${
        !showContent ? 'opacity-0 translate-y-12' : 
        transitionRole ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        {/* CITIZEN CARD */}
        <button 
          onClick={() => handleRoleSelect('CITIZEN')}
          className="group relative w-full text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          <Card className="relative p-6 border-2 border-transparent group-hover:border-brand-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-2xl bg-white/90 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors duration-300">
                <User size={28} className="text-brand-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Citizen</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Book appointments, consult doctors, check symptoms with AI, and manage prescriptions.
                </p>
                <div className="inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-700">
                  Continue as Citizen
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Card>
        </button>

        {/* ASHA WORKER CARD */}
        <button 
          onClick={() => handleRoleSelect('ASHA')}
          className="group relative w-full text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          <Card className="relative p-6 border-2 border-transparent group-hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-2xl bg-white/90 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-500 transition-colors duration-300">
                <Stethoscope size={28} className="text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">ASHA Worker</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Manage villagers, track home visits, monitor health dashboards, and handle referrals.
                </p>
                <div className="inline-flex items-center text-sm font-bold text-purple-600 group-hover:text-purple-700">
                  Continue as ASHA Worker
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Card>
        </button>

        {/* DOCTOR CARD */}
        <button 
          onClick={() => handleRoleSelect('DOCTOR')}
          className="group relative w-full text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          <Card className="relative p-6 border-2 border-transparent group-hover:border-teal-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-2xl bg-white/90 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors duration-300">
                <Activity size={28} className="text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Doctor</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Manage your appointments, set availability, and offer remote consultations.
                </p>
                <div className="inline-flex items-center text-sm font-bold text-teal-600 group-hover:text-teal-700">
                  Continue as Doctor
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Card>
        </button>
      </div>
    </div>
  )
}

export default RoleSelection
