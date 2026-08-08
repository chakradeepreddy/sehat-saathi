// src/pages/doctor/DoctorDashboard.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, Calendar, Clock, ArrowUpRight, 
  Video, Phone, MessageSquare, Activity 
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Avatar, Badge, Button } from '@/components/ui'
import { ROUTES } from '@/constants'

const TYPE_ICONS = {
  video: Video,
  audio: Phone,
  chat: MessageSquare,
}

const DoctorDashboard = () => {
  const { user, appointments } = useApp()
  const [filter, setFilter] = useState('today')

  // Filter appointments for this doctor
  const myAppointments = useMemo(() => {
    return appointments.filter(a => a.doctorId === user?.id)
  }, [appointments, user?.id])

  const todayStr = new Date().toISOString().split('T')[0]
  
  const todayAppointments = useMemo(() => {
    return myAppointments.filter(a => a.date === todayStr)
  }, [myAppointments, todayStr])

  const upcomingAppointments = useMemo(() => {
    return myAppointments.filter(a => a.date > todayStr)
  }, [myAppointments, todayStr])

  const displayList = filter === 'today' ? todayAppointments : upcomingAppointments

  return (
    <PageWrapper>
      <TopBar 
        title="Dashboard"
        subtitle={`Welcome, ${user?.name}`}
      />

      <div className="p-4 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-teal-50 border-teal-100 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 text-teal-100 opacity-50">
              <Calendar size={64} />
            </div>
            <div className="relative z-10">
              <div className="text-teal-600 mb-1"><Calendar size={20} /></div>
              <div className="text-2xl font-bold text-teal-900">{todayAppointments.length}</div>
              <div className="text-xs font-semibold text-teal-700">Today's Appts</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-blue-50 border-blue-100 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 text-blue-100 opacity-50">
              <Users size={64} />
            </div>
            <div className="relative z-10">
              <div className="text-blue-600 mb-1"><Users size={20} /></div>
              <div className="text-2xl font-bold text-blue-900">{myAppointments.length}</div>
              <div className="text-xs font-semibold text-blue-700">Total Patients</div>
            </div>
          </Card>
        </div>

        {/* Appointments Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Consultations</h2>
          </div>

          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilter('today')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === 'today' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Today ({todayAppointments.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === 'upcoming' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
          </div>

          {displayList.length === 0 ? (
            <Card className="p-8 text-center bg-slate-50 border-dashed">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                <Calendar size={32} />
              </div>
              <p className="text-slate-500 font-medium">No appointments {filter}.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {displayList.map((apt) => {
                const TypeIcon = TYPE_ICONS[apt.type] || Activity
                const isVideo = apt.type === 'video'
                
                return (
                  <Card key={apt.id} className="p-4 flex flex-col gap-4 hover:border-teal-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.id}&backgroundColor=e2e8f0`} 
                          fallback="P" 
                        />
                        <div>
                          <h3 className="font-bold text-slate-800">Patient #{apt.id.slice(-4)}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock size={14} />
                            <span>{apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={isVideo ? 'primary' : 'secondary'} className="capitalize gap-1">
                        <TypeIcon size={12} /> {apt.type}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button className={`flex-1 ${isVideo ? 'bg-teal-600' : ''}`}>
                        Start Consult
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default DoctorDashboard
