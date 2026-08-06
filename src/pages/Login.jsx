// src/pages/Login.jsx
// ─────────────────────────────────────────────────────────────
// Login screen — phone-number based (no email).
// WHY phone: Rural users in India primarily use phone numbers as identity.
//            ABHA (Ayushman Bharat Health Account) is phone-linked.
//            Email is NOT a realistic primary identifier for Nabha users.
//
// Mock auth: Any 10-digit phone number proceeds to dashboard.
// OTP is simulated with a 1.5s fake delay — realistic demo experience.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Shield, ChevronRight, CheckCircle2,
  Heart, Stethoscope, Bot, Video, Sparkles, ShieldCheck
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { ROUTES, APP_TAGLINE } from '@/constants'
import { Button, Logo } from '@/components/ui'

// ── Trust badges shown below the form ─────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Shield,      text: 'ABHA ID Compatible' },
  { icon: CheckCircle2,text: 'NHA Compliant' },
  { icon: Heart,       text: 'Data Protected' },
]

// ── Feature highlights in the hero section ───────────────────────────────────
const FEATURES = [
  { icon: Sparkles,    label: 'Powered by secure Google AI', color: 'bg-cyan-400/20' },
  { icon: ShieldCheck, label: 'Ayushman Bharat Network', color: 'bg-blue-400/20' },
]

// ── OTP digit input ───────────────────────────────────────────────────────────
const OTPInput = ({ value, onChange }) => {
  const digits = value.split('').concat(Array(6 - value.length).fill(''))

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const arr = digits.map((d) => d)
    arr[idx] = char
    const newVal = arr.join('').slice(0, 6)
    onChange(newVal)
    // Auto-focus next
    if (char && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          aria-label={`OTP digit ${i + 1}`}
          className={[
            'w-11 h-12 text-center text-lg font-bold rounded-xl border-2 shadow-sm',
            'transition-all duration-200 active:scale-95',
            'focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-200/50',
            digits[i] ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-[var(--color-text)]',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

// ── Main Login Component ──────────────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate()
  const { login } = useApp()

  const [step, setStep]           = useState('phone')  // 'phone' | 'otp' | 'success'
  const [phone, setPhone]         = useState('')
  const [otp, setOtp]             = useState('')
  const [loading, setLoading]     = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const isValidPhone = phone.replace(/\D/g, '').length === 10

  // ── Step 1: Send OTP ─────────────────────────────────────────────────────────
  const handleSendOTP = async () => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }
    setPhoneError('')
    setLoading(true)

    // Simulate network delay — makes demo feel real
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setStep('otp')
  }

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────────
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))
    setStep('success')
    await new Promise((r) => setTimeout(r, 800))

    // Mock login — passes default user
    login()
    navigate(ROUTES.DASHBOARD, { replace: true })
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(val)
    if (phoneError) setPhoneError('')
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center justify-end pt-16 pb-10 px-6 overflow-hidden"
        style={{
          minHeight: '42vh',
          background: 'linear-gradient(145deg, #0c4a6e 0%, #0284c7 55%, #0ea5e9 100%)',
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-200/20 blur-2xl" />

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">
          {/* New logo — glass container + unique S+ECG mark */}
          <div className="relative animate-float mb-4">
            <div
              className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
              }}
            >
              <Logo size="lg" variant="white" showText={false} iconOnly />
            </div>
          </div>

          <h1 className="text-[28px] font-display font-bold text-white tracking-tight leading-[1.15] mt-2">
            Aapki Sehat, <br />Hamari Zimmedari
          </h1>
          <p className="text-white/80 text-sm mt-3 font-medium px-4">
            Your health, our responsibility.<br />Let's get you feeling better.
          </p>
        </div>

        {/* Feature pills */}
        <div className="relative z-10 flex gap-2 mt-7 flex-wrap justify-center">
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Icon size={12} />
              {label}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="relative z-10 text-white/50 text-[11px] text-center mt-5 max-w-xs font-medium tracking-wide uppercase">
          Empowering Rural Healthcare
        </p>

        {/* Bottom wave */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 375 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 32L375 32L375 12C280 32 95 -4 0 12L0 32Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* ── Form Section ─────────────────────────────────────────────────── */}
      <div className="flex-1 bg-[var(--color-surface)] px-6 pt-2 pb-10">

        {/* ── Step: Success ─────────────────────────────────────────── */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
            <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={40} className="text-success-500" />
            </div>
            <h2 className="text-xl font-display font-bold text-[var(--color-text)]">Welcome back!</h2>
            <p className="text-sm text-[var(--color-text-soft)] mt-1">Redirecting to your dashboard...</p>
          </div>
        )}

        {/* ── Step: Phone ───────────────────────────────────────────── */}
        {step === 'phone' && (
          <div className="animate-fade-in-up">
            <div className="mb-7 mt-2">
              <h2 className="text-xl font-display font-bold text-[var(--color-text)]">
                Sign in to continue
              </h2>
              <p className="text-sm text-[var(--color-text-soft)] mt-1">
                Enter your mobile number to receive a verification code
              </p>
            </div>

            {/* Phone input */}
            <div className="mb-5">
              <label htmlFor="phone-input" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                Mobile Number <span className="text-emergency-500">*</span>
              </label>

              <div className={[
                'flex items-center gap-0 rounded-xl border-2 bg-white overflow-hidden shadow-sm',
                'transition-all duration-200 focus-within:scale-[1.01] active:scale-[0.99]',
                phoneError
                  ? 'border-emergency-400'
                  : 'border-[var(--color-border)] focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100/50',
              ].join(' ')}>
                {/* Country code */}
                <div className="flex items-center gap-2 px-3.5 py-3.5 border-r border-[var(--color-border)] bg-slate-50 shrink-0">
                  <span className="text-base">🇮🇳</span>
                  <span className="text-sm font-semibold text-[var(--color-text-soft)]">+91</span>
                </div>
                {/* Number field */}
                <input
                  id="phone-input"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => e.key === 'Enter' && isValidPhone && handleSendOTP()}
                  className="flex-1 h-12 px-4 text-base font-medium bg-transparent focus:outline-none text-[var(--color-text)] placeholder:text-[var(--color-muted)] tracking-wider"
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? 'phone-error' : undefined}
                  autoComplete="tel"
                  autoFocus
                />
                {/* Valid indicator */}
                {isValidPhone && (
                  <div className="pr-3.5">
                    <CheckCircle2 size={18} className="text-success-500" />
                  </div>
                )}
              </div>

              {phoneError && (
                <p id="phone-error" className="flex items-center gap-1.5 text-xs text-emergency-500 font-medium mt-1.5">
                  <span>⚠️</span> {phoneError}
                </p>
              )}
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onClick={handleSendOTP}
              disabled={!isValidPhone}
              rightIcon={<ChevronRight size={18} />}
              id="send-otp-button"
            >
              {loading ? 'Sending OTP...' : 'Get OTP'}
            </Button>

            {/* Demo hint */}
            <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
              <p className="text-xs text-brand-600 text-center">
                <span className="font-semibold">Demo mode:</span> Enter any 10-digit number to continue
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 mt-7 pt-6 border-t border-[var(--color-border)]">
              {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-[var(--color-muted)]">
                  <Icon size={13} />
                  <span className="text-[11px] font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step: OTP ─────────────────────────────────────────────── */}
        {step === 'otp' && (
          <div className="animate-fade-in-up">
            <div className="mb-7 mt-2">
              {/* Back to phone */}
              <button
                onClick={() => { setStep('phone'); setOtp('') }}
                className="flex items-center gap-1 text-xs text-brand-600 font-semibold mb-4 hover:text-brand-800 transition-colors"
              >
                ← Change number
              </button>

              <h2 className="text-xl font-display font-bold text-[var(--color-text)]">
                Verify your number
              </h2>
              <p className="text-sm text-[var(--color-text-soft)] mt-1">
                We sent a 6-digit OTP to{' '}
                <span className="font-semibold text-[var(--color-text)]">+91 {phone}</span>
              </p>
            </div>

            {/* OTP boxes */}
            <OTPInput value={otp} onChange={setOtp} />

            {/* Resend */}
            <div className="text-center mt-5">
              <button className="text-sm text-[var(--color-muted)] hover:text-brand-600 transition-colors">
                Didn't receive OTP?{' '}
                <span className="font-semibold text-brand-600">Resend in 30s</span>
              </button>
            </div>

            {/* Verify CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={otp.length !== 6}
              onClick={handleVerifyOTP}
              className="mt-6"
              id="verify-otp-button"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            {/* Demo hint */}
            <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
              <p className="text-xs text-brand-600 text-center">
                <span className="font-semibold">Demo:</span> Enter any 6 digits to continue
              </p>
            </div>
          </div>
        )}

        {/* Pilot region note */}
        {step !== 'success' && (
          <div className="mt-10 text-center">
            <p className="text-[11px] text-[var(--color-muted)] leading-relaxed">
              🌾 Pilot programme for <span className="font-semibold">Nabha, Punjab</span>
              <br />Part of AI-Assisted Rural Healthcare Ecosystem initiative
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
