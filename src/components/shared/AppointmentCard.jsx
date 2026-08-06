// src/components/shared/AppointmentCard.jsx
// ─────────────────────────────────────────────────────────────
// Appointment card for Dashboard and Profile.
// Shows doctor info, appointment time, status, and action buttons.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Video, Phone, MessageSquare, FileText } from 'lucide-react'
import { Card, Badge, Avatar, Button } from '@/components/ui'
import { formatAppointmentDate } from '@/utils/formatDate'

const TYPE_ICONS = {
  video: { icon: Video,          label: 'Video Call' },
  audio: { icon: Phone,          label: 'Audio Call' },
  chat:  { icon: MessageSquare,  label: 'Chat' },
}

const STATUS_CONFIG = {
  upcoming:  { variant: 'primary',  label: 'Upcoming' },
  completed: { variant: 'success',  label: 'Completed' },
  cancelled: { variant: 'danger',   label: 'Cancelled' },
}

/**
 * @param {object} props
 * @param {object} props.appointment - Appointment data object
 * @param {'compact'|'full'} [props.mode='full']
 */
const AppointmentCard = ({ appointment, mode = 'full' }) => {
  const navigate = useNavigate()
  const TypeIcon = TYPE_ICONS[appointment.type]?.icon || Video
  const statusConfig = STATUS_CONFIG[appointment.status] || STATUS_CONFIG.upcoming
  const displayDate = formatAppointmentDate(appointment.date)

  const handleJoin = () => navigate(`/consultation/${appointment.id}`)
  const handlePrescription = () => navigate(`/prescriptions/${appointment.prescriptionId}`)

  return (
    <Card className={`p-4 ${mode === 'compact' ? 'border border-brand-100 bg-brand-50/50' : ''}`}>
      {/* Header row */}
      <div className="flex items-start gap-3">
        <Avatar
          src={appointment.avatar}
          name={appointment.doctorName}
          size="md"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">
              {appointment.doctorName}
            </h3>
            <Badge variant={statusConfig.variant} size="xs">
              {statusConfig.label}
            </Badge>
          </div>
          <p className="text-xs text-brand-600 font-medium mt-0.5">
            {appointment.specialization}
          </p>
        </div>
      </div>

      {/* Date & Time row */}
      <div className="flex items-center gap-4 mt-3 pl-0">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-[var(--color-muted)]" />
          <span className="text-xs text-[var(--color-text-soft)] font-medium">
            {displayDate}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-[var(--color-muted)]" />
          <span className="text-xs text-[var(--color-text-soft)] font-medium">
            {appointment.time}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TypeIcon size={13} className="text-[var(--color-muted)]" />
          <span className="text-xs text-[var(--color-text-soft)]">
            {TYPE_ICONS[appointment.type]?.label}
          </span>
        </div>
      </div>

      {/* Actions — only for full mode */}
      {mode === 'full' && (
        <div className="flex gap-2 mt-4">
          {appointment.status === 'upcoming' && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<Video size={14} />}
              onClick={handleJoin}
              id={`join-appointment-${appointment.id}`}
            >
              Join Call
            </Button>
          )}
          {appointment.status === 'completed' && appointment.prescriptionId && (
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              leftIcon={<FileText size={14} />}
              onClick={handlePrescription}
              id={`view-prescription-${appointment.id}`}
            >
              View Prescription
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}

export default AppointmentCard
