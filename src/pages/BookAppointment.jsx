// src/pages/BookAppointment.jsx
// ─────────────────────────────────────────────────────────────
// Booking flow — select consultation type, date, and time slot.
// Simulates the booking process and adds to global state.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Video, Phone, MessageSquare, CheckCircle2,
  Calendar as CalendarIcon, Clock
} from 'lucide-react'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Button, Avatar, Modal } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { ROUTES } from '@/constants'
import doctorsData from '@/data/doctors.json'

const TYPE_ICONS = {
  video: { icon: Video,         label: 'Video Call' },
  audio: { icon: Phone,         label: 'Audio Call' },
  chat:  { icon: MessageSquare, label: 'Chat' },
}

// Generate next 7 days for the date picker
const getNext7Days = () => {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push({
      dateStr: d.toISOString().split('T')[0], // YYYY-MM-DD
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tom' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
    })
  }
  return dates
}

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
]

const BookAppointment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addAppointment } = useApp()
  const doctor = doctorsData.find((d) => d.id === id)

  const [dates] = useState(getNext7Days())
  const [selectedType, setSelectedType] = useState(doctor?.consultationTypes[0] || 'video')
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr)
  const [selectedTime, setSelectedTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-semibold">Doctor not found</p>
      </div>
    )
  }

  const handleConfirm = async () => {
    setIsBooking(true)
    // Simulate network delay for booking
    await new Promise((r) => setTimeout(r, 1500))
    setIsBooking(false)
    setShowSuccess(true)

    // Add to global state
    addAppointment({
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      avatar: doctor.avatar,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'upcoming',
    })
  }

  const handleDone = () => {
    setShowSuccess(false)
    navigate(ROUTES.DASHBOARD, { replace: true })
  }

  return (
    <>
      <TopBar title="Book Appointment" />

      <PageWrapper noPadding noNavOffset className="pt-14 pb-28">
        
        {/* ── Doctor Info Header ───────────────────────────────── */}
        <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <div className="flex gap-3">
            <Avatar src={doctor.avatar} name={doctor.name} size="lg" />
            <div className="flex-1">
              <h2 className="text-sm font-bold text-[var(--color-text)]">{doctor.name}</h2>
              <p className="text-xs text-brand-600 font-medium">{doctor.specialization}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs text-[var(--color-text-soft)]">Consultation Fee:</span>
                <span className="text-xs font-bold text-brand-700">₹{doctor.fee}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 flex flex-col gap-6 max-w-3xl mx-auto">
          
          {/* ── Consultation Type ─────────────────────────────── */}
          <section>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
              <Video size={16} className="text-brand-500" />
              Consultation Type
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {doctor.consultationTypes.map((type) => {
                const { icon: Icon, label } = TYPE_ICONS[type]
                const isSelected = selectedType === type
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={[
                      'flex-1 min-w-[100px] p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all',
                      isSelected
                        ? 'border-brand-500 bg-brand-50 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-soft)] hover:border-brand-300',
                    ].join(' ')}
                  >
                    <Icon size={20} className={isSelected ? 'text-brand-600' : ''} />
                    <span className={`text-xs font-semibold ${isSelected ? 'text-brand-700' : ''}`}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Date Selection ────────────────────────────────── */}
          <section>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
              <CalendarIcon size={16} className="text-brand-500" />
              Select Date
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {dates.map(({ dateStr, dayName, dateNum }) => {
                const isSelected = selectedDate === dateStr
                return (
                  <button
                    key={dateStr}
                    onClick={() => { setSelectedDate(dateStr); setSelectedTime('') }}
                    className={[
                      'flex-shrink-0 w-14 py-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all',
                      isSelected
                        ? 'border-brand-500 bg-brand-600 text-white shadow-md'
                        : 'border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-brand-300',
                    ].join(' ')}
                  >
                    <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-brand-100' : 'text-[var(--color-muted)]'}`}>
                      {dayName}
                    </span>
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-[var(--color-text)]'}`}>
                      {dateNum}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Time Selection ────────────────────────────────── */}
          <section>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
              <Clock size={16} className="text-brand-500" />
              Select Time
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={[
                      'py-2.5 rounded-xl border text-xs font-semibold transition-all',
                      isSelected
                        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-soft)] hover:border-brand-300',
                    ].join(' ')}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </section>

        </div>
      </PageWrapper>

      {/* ── Bottom Action Bar ──────────────────────────────── */}
      <div className="fixed bottom-safe-nav lg:bottom-0 left-0 lg:left-64 right-0 p-4 z-20 bg-[var(--color-surface)] border-t border-[var(--color-border)] max-w-3xl mx-auto transition-all duration-300">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isBooking}
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
          id="confirm-booking"
        >
          {isBooking ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>

      {/* ── Success Modal ──────────────────────────────────── */}
      <Modal isOpen={showSuccess} onClose={() => {}} title="" size="sm">
        <div className="flex flex-col items-center text-center pb-2 pt-4">
          <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4 animate-bounce-slight">
            <CheckCircle2 size={32} className="text-success-500" />
          </div>
          <h2 className="text-lg font-display font-bold text-[var(--color-text)] mb-1">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-[var(--color-text-soft)] mb-6">
            Your appointment with <strong>{doctor.name}</strong> is scheduled for <strong>{selectedTime}</strong> on <strong>{selectedDate}</strong>.
          </p>
          <Button variant="primary" fullWidth onClick={handleDone} id="done-booking">
            Go to Dashboard
          </Button>
        </div>
      </Modal>

    </>
  )
}

export default BookAppointment
