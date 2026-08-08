// src/pages/doctor/DoctorRegister.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Stethoscope, Activity, MapPin, ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/context/RoleContext'
import { ROUTES, SPECIALIZATIONS } from '@/constants'
import { LOCATIONS } from '@/utils/location'
import { Button, Logo } from '@/components/ui'

const generateDoctorId = () => `d${Math.floor(Math.random() * 10000)}`

const DoctorRegister = () => {
  const navigate = useNavigate()
  const { registerDoctor, login } = useApp()
  const { setRole } = useRole()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialization: SPECIALIZATIONS[0],
    qualification: '',
    experience: '',
    fee: '',
    clinic: '',
    locationKey: 'NABHA', // Default fallback
    videoConsult: true,
    audioConsult: true,
    chatConsult: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Construct the new doctor object
    const newDoctor = {
      id: generateDoctorId(),
      name: `Dr. ${formData.name}`,
      phone: formData.phone,
      specialization: formData.specialization,
      qualification: formData.qualification,
      experience: parseInt(formData.experience) || 0,
      rating: 5.0, // Initial rating
      reviewCount: 0,
      patientSatisfaction: "100%",
      totalConsults: "0",
      verified: true, // Auto-verified for prototype
      languages: ["Punjabi", "Hindi", "English"],
      fee: parseInt(formData.fee) || 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.phone}&backgroundColor=e5f7f3`,
      available: true,
      isVisible: true,
      nextSlot: "Today, 10:00 AM",
      clinic: formData.clinic,
      location: LOCATIONS[formData.locationKey].name,
      latitude: LOCATIONS[formData.locationKey].lat,
      longitude: LOCATIONS[formData.locationKey].lon,
      about: `Dr. ${formData.name} is a newly registered ${formData.specialization} serving the community at ${formData.clinic}.`,
      expertise: [formData.specialization, "General Consultation"],
      consultationTypes: [
        ...(formData.videoConsult ? ['video'] : []),
        ...(formData.audioConsult ? ['audio'] : []),
        ...(formData.chatConsult ? ['chat'] : [])
      ],
      gender: "unspecified"
    }

    setTimeout(() => {
      // Save to global state
      registerDoctor(newDoctor)
      
      // Auto-login
      login(newDoctor)
      setRole('DOCTOR')
      
      setIsLoading(false)
      navigate(ROUTES.DOCTOR_DASHBOARD, { replace: true })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center pb-12">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        {/* Header Background */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-teal-50 to-white -z-10" />

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Logo size="md" />
            <div className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Stethoscope size={14} /> Doctor Portal
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Register Practice</h1>
            <p className="text-slate-500 text-sm">Join the Sehat Saathi rural healthcare network.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Basic Info</h2>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (without Dr.)</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-semibold text-slate-500 border-r border-slate-200 pr-3">+91</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="98765 43210"
                    className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Professional Info</h2>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800 appearance-none"
                >
                  {SPECIALIZATIONS.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications</label>
                  <input
                    required
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="MBBS, MD"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    required
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Practice Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Practice & Location</h2>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic / Hospital Name</label>
                <input
                  required
                  type="text"
                  name="clinic"
                  value={formData.clinic}
                  onChange={handleChange}
                  placeholder="Sehat Clinic"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Location</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={18} />
                  </span>
                  <select
                    name="locationKey"
                    value={formData.locationKey}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800 appearance-none"
                  >
                    {Object.entries(LOCATIONS).map(([key, loc]) => (
                      <option key={key} value={key}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    required
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    placeholder="300"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white mt-8" 
              disabled={isLoading || phone.length < 10 || !formData.name}
              isLoading={isLoading}
            >
              Complete Registration
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-slate-500 text-sm">
                Already registered?{' '}
                <Link to={ROUTES.DOCTOR_LOGIN} className="text-teal-600 font-bold hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default DoctorRegister
