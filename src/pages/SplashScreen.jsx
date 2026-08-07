// src/pages/SplashScreen.jsx
// ─────────────────────────────────────────────────────────────
// Brand entry screen — shown for 2.5 seconds on first load.
// Auto-redirects: authenticated users → Dashboard, others → Login.
// Design goal: feel like opening a premium health app on the App Store.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Logo } from '@/components/ui'

// Animated floating orb — pure CSS, no library needed
const FloatingOrb = ({ className, delay = '0s' }) => (
  <div 
    className={`absolute rounded-full blur-3xl opacity-30 animate-float ${className}`} 
    style={{ animationDelay: delay }}
  />
)

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0)
  // phase 0 = logo animating in
  // phase 1 = tagline appears
  // phase 2 = features appear
  // phase 3 = exit fade

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),   // Tagline after logo
      setTimeout(() => setPhase(2), 1200),  // Features appear
      setTimeout(() => setPhase(3), 2000),  // Start exit
      setTimeout(() => setPhase(4), 2200),  // Start background exit
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 3000),
    ]
    return () => timers.forEach(t => clearTimeout(t))
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-[100]"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #0369a1 0%, #0c4a6e 40%, #082f49 100%)',
        opacity: phase >= 4 ? 0 : 1,
        pointerEvents: phase >= 4 ? 'none' : 'auto',
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      {/* Decorative background orbs — deep and calm */}
      <FloatingOrb className="w-[500px] h-[500px] bg-brand-400/20 -top-40 -right-40 mix-blend-screen" delay="0s" />
      <FloatingOrb className="w-[400px] h-[400px] bg-cyan-400/15 -bottom-32 -left-32 mix-blend-screen" delay="-2s" />
      <FloatingOrb className="w-64 h-64 bg-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen" delay="-4s" />

      {/* Premium Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8"
        style={{
          opacity: phase >= 3 ? 0 : 1,
          transform: phase >= 3 ? 'scale(0.96)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Logo icon — bounces in */}
        <div
          className="mb-8"
          style={{
            opacity: phase >= 0 ? 1 : 0,
            transform: phase >= 0 ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
            transition: 'opacity 1s var(--ease-apple), transform 1s var(--ease-apple)',
          }}
        >
          {/* Large logo mark — using the branded Logo component icon only */}
          <div className="relative animate-float">
            <div
              className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              {/* Logo at XL size, white variant, icon only */}
              <Logo size="xl" variant="white" showText={false} iconOnly />
            </div>
            {/* Deep pulse ring */}
            <div
              className="absolute inset-0 rounded-[2.5rem] border border-white/30"
              style={{ animation: 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            {/* The Awakening ripple — expands out once at the peak of the heartbeat (approx 1s in) */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] bg-white opacity-0"
              style={{
                animation: 'rippleOut 3s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                animationDelay: '0.8s'
              }}
            />
          </div>
        </div>

        {/* App name */}
        <div
          style={{
            opacity: phase >= 0 ? 1 : 0,
            transform: phase >= 0 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s var(--ease-apple) 0.1s, transform 0.8s var(--ease-apple) 0.1s',
          }}
        >
          <h1
            className="text-white font-display font-extrabold tracking-tight"
            style={{ fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Sehat Saathi
          </h1>
          <p
            className="text-white/75 mt-1"
            style={{ fontFamily: 'Inter', fontSize: '1.1rem', letterSpacing: '0.02em' }}
          >
            स्वास्थ्य साथी
          </p>
        </div>

        {/* Tagline */}
        <div
          className="mt-6"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.9s var(--ease-apple), transform 0.9s var(--ease-apple)',
          }}
        >
          <p className="text-white/95 font-display font-semibold text-xl tracking-tight drop-shadow-sm">
            Aapki Sehat, Hamari Zimmedari
          </p>
          <p className="text-white/60 text-sm mt-1">
            Let's get you feeling better.
          </p>
        </div>

        {/* Feature pills */}
        <div
          className="flex flex-wrap justify-center gap-2.5 mt-8"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
            transition: 'opacity 0.8s var(--ease-apple), transform 0.8s var(--ease-apple)',
          }}
        >
          {['AI Symptom Check', 'Video Consult', 'E-Prescription'].map((feat, i) => (
            <span
              key={feat}
              className="text-xs font-bold text-white/95 px-4 py-2 rounded-full shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom — loading indicator + attribution */}
      <div
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 0.5s ease 0.3s',
        }}
      >
        {/* Loading bar */}
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{
              width: phase >= 2 ? '100%' : '0%',
              transition: 'width 1.2s ease',
            }}
          />
        </div>
        <p className="text-white/50 text-[11px] font-medium tracking-wider uppercase">
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  )
}

export default SplashScreen
