// src/pages/doctor/DoctorProfileManage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, LogOut, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Avatar, Button } from '@/components/ui'
import { ROUTES } from '@/constants'

const DoctorProfileManage = () => {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  
  // Note: In a real app we'd dispatch an update to global state.
  // For the prototype, we'll just simulate local state updates.
  const [isVisible, setIsVisible] = useState(user?.isVisible ?? true)
  const [isAvailable, setIsAvailable] = useState(user?.available ?? true)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.ROLE_SELECTION, { replace: true })
  }

  return (
    <PageWrapper>
      <TopBar title="Profile Settings" />

      <div className="p-4 space-y-6">
        <Card className="p-6 text-center">
          <Avatar 
            src={user?.avatar} 
            fallback="Dr" 
            size="xl" 
            className="mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
          <p className="text-slate-500 font-medium">{user?.specialization}</p>
          <div className="flex items-center justify-center gap-1 text-teal-600 mt-2 text-sm font-semibold">
            <CheckCircle2 size={16} /> Verified Practitioner
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Visibility & Status</h3>
          
          <Card className="divide-y divide-slate-100">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Available for Consultation</p>
                <p className="text-sm text-slate-500">Show as currently accepting appointments</p>
              </div>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isAvailable ? 'bg-teal-500' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Visible to Citizens</p>
                <p className="text-sm text-slate-500">Appear in the public directory</p>
              </div>
              <button 
                onClick={() => setIsVisible(!isVisible)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isVisible ? 'bg-blue-500' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isVisible ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Account</h3>
          
          <Card className="p-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left font-semibold"
            >
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <LogOut size={20} />
              </div>
              Sign Out
            </button>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}

export default DoctorProfileManage
