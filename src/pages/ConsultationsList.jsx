// src/pages/ConsultationsList.jsx
// ─────────────────────────────────────────────────────────────
// Displays a list of all upcoming and past video consultations.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom'
import { Video, Calendar } from 'lucide-react'
import { TopBar, PageWrapper } from '@/components/layout'
import { AppointmentCard } from '@/components/shared'
import { useApp } from '@/context/AppContext'

const ConsultationsList = () => {
  const navigate = useNavigate()
  const { appointments } = useApp()
  
  const upcoming = appointments.filter(a => a.status === 'upcoming')
  const past = appointments.filter(a => a.status === 'completed')

  return (
    <>
      <TopBar title="My Consultations" showBack={false} />
      <PageWrapper className="pt-14 max-w-3xl mx-auto">
        <div className="flex flex-col gap-8 mt-4 px-4 lg:px-0">
          
          <section>
            <h2 className="text-sm font-display font-bold text-[var(--color-muted)] uppercase tracking-wider mb-3">
              Upcoming Calls
            </h2>
            {upcoming.length > 0 ? (
              <div className="flex flex-col gap-4">
                {upcoming.map(apt => (
                  <AppointmentCard key={apt.id} appointment={apt} mode="full" />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <Calendar size={24} className="text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-text)]">No upcoming calls</h3>
                <p className="text-xs text-[var(--color-muted)] mt-1 mb-4">You don't have any video consultations scheduled.</p>
                <button
                  onClick={() => navigate('/doctors')}
                  className="px-4 py-2 bg-brand-50 text-brand-600 text-xs font-bold rounded-full hover:bg-brand-100 transition-colors"
                >
                  Book an Appointment
                </button>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-sm font-display font-bold text-[var(--color-muted)] uppercase tracking-wider mb-3">
              Past Consultations
            </h2>
            {past.length > 0 ? (
              <div className="flex flex-col gap-4 opacity-75">
                {past.map(apt => (
                  <AppointmentCard key={apt.id} appointment={apt} mode="full" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">No past consultations found.</p>
            )}
          </section>

        </div>
      </PageWrapper>
    </>
  )
}

export default ConsultationsList
