// src/pages/doctor/DoctorLogin.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Stethoscope, ShieldCheck, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/context/RoleContext'
import { ROUTES } from '@/constants'
import { Button, Logo } from '@/components/ui'

// ── OTP digit input ───────────────────────────────────────────────────────────
const OTPInput = ({ value, onChange }) => {
  const digits = value.split('').concat(Array(6 - value.length).fill(''))

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const arr = [...digits]
    arr[idx] = char
    const newVal = arr.join('').slice(0, 6)
    onChange(newVal)
    if (char && idx < 5) document.getElementById(`doctor-otp-${idx + 1}`)?.focus()
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      document.getElementById(`doctor-otp-${idx - 1}`)?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          id={`doctor-otp-${i}`}
          type="text"
          inputMode="numeric"
          value={digits[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-14 text-center text-2xl font-bold bg-white border border-teal-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all outline-none text-slate-800"
          maxLength={1}
        />
      ))}
    </div>
  )
}

const DoctorLogin = () => {
  const navigate = useNavigate()
  const { login } = useApp()
  const { setRole } = useRole()
  
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = (e) => {
    e.preventDefault()
    if (phone.length < 10) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
    }, 800)
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (otp.length < 6) return
    setIsLoading(true)
    
    setTimeout(() => {
      // Mock Doctor User
      const doctorUser = {
        id: 'd999',
        name: 'Dr. Practitioner',
        phone,
        specialization: 'General Physician',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}&backgroundColor=e5f7f3`,
      }
      login(doctorUser)
      setRole('DOCTOR')
      navigate(ROUTES.DOCTOR_DASHBOARD, { replace: true })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {/* Header Background */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-teal-50 to-white -z-10" />

        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <Logo size="md" />
            <div className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Stethoscope size={14} /> Doctor Portal
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-sm">
                <Activity size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back, Doctor</h1>
              <p className="text-slate-500">Sign in to manage your rural practice.</p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-semibold text-slate-500 border-r border-slate-200 pr-3">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full pl-16 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white" 
                  disabled={phone.length < 10 || isLoading}
                  isLoading={isLoading}
                >
                  Send OTP
                </Button>
                
                <div className="text-center mt-6">
                  <p className="text-slate-500 text-sm">
                    New to Sehat Saathi?{' '}
                    <Link to={ROUTES.DOCTOR_REGISTER} className="text-teal-600 font-bold hover:underline">
                      Register your practice
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600 mb-4">
                    Enter the 6-digit OTP sent to <br/>
                    <span className="font-bold text-slate-800">+91 {phone}</span>
                  </p>
                  <OTPInput value={otp} onChange={setOtp} />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white"
                  disabled={otp.length < 6 || isLoading}
                  isLoading={isLoading}
                  rightIcon={<ChevronRight size={20} />}
                >
                  Verify & Proceed
                </Button>
              </form>
            )}
          </div>

          <div className="mt-8 pb-4">
            <div className="flex justify-center gap-6 border-t border-slate-100 pt-6">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={20} className="text-teal-600" />
                <span className="text-[10px] font-semibold text-slate-500">Verified Pros</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 size={20} className="text-teal-600" />
                <span className="text-[10px] font-semibold text-slate-500">NHA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin
