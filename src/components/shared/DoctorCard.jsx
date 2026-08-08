// src/components/shared/DoctorCard.jsx
// ─────────────────────────────────────────────────────────────
// Doctor card used in both Dashboard (horizontal scroll) and
// Doctor Directory (full list). Supports two display modes.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom'
import { Star, Clock, Languages, Video, BadgeCheck, Building2, ThumbsUp, Users, MapPin } from 'lucide-react'
import { Card, Badge, Avatar, Button } from '@/components/ui'

/**
 * @param {object}  props
 * @param {object}  props.doctor   - Doctor data object from doctors.json
 * @param {'compact'|'full'} [props.mode='full']
 * @param {string}  [props.className]
 */
const DoctorCard = ({ doctor, mode = 'full', className = '' }) => {
  const navigate = useNavigate()

  const handleView = (e) => {
    e.stopPropagation()
    navigate(`/doctors/${doctor.id}`)
  }

  const handleBook = (e) => {
    e.stopPropagation()
    navigate(`/doctors/${doctor.id}/book`)
  }

  // ── Compact mode — for horizontal scroll on Dashboard ───────────────────────
  if (mode === 'compact') {
    return (
      <Card
        interactive
        onClick={handleView}
        className={`p-4 w-48 flex-shrink-0 ${className}`}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <Avatar
            src={doctor.avatar}
            name={doctor.name}
            size="lg"
            online={doctor.available}
          />
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] leading-tight line-clamp-1">
              {doctor.name}
            </p>
            <p className="text-xs text-[var(--color-text-soft)] mt-0.5 line-clamp-1">
              {doctor.specialization}
            </p>
            {doctor.distanceKm !== undefined && (
              <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-[var(--color-muted)] font-medium">
                <MapPin size={10} />
                {doctor.distanceKm.toFixed(1)} km
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-[var(--color-text)]">{doctor.rating}</span>
          </div>
          <Badge
            variant={doctor.available ? 'available' : 'busy'}
            dot
            size="xs"
          >
            {doctor.available ? 'Available' : 'Busy'}
          </Badge>
        </div>
      </Card>
    )
  }

  // ── Full mode — for Doctor Directory list ────────────────────────────────────
  return (
    <Card interactive onClick={handleView} className={`p-4 ${className}`}>
      {/* Top section */}
      <div className="flex gap-3">
        <Avatar
          src={doctor.avatar}
          name={doctor.name}
          size="lg"
          online={doctor.available}
          className="shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-[var(--color-text)] leading-tight">
                  {doctor.name}
                </h3>
                {doctor.verified && (
                  <BadgeCheck size={16} className="text-blue-500 fill-blue-50" />
                )}
              </div>
              <p className="text-xs text-brand-600 font-medium mt-0.5">
                {doctor.specialization}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                {doctor.qualification}
              </p>
              {doctor.clinic && (
                <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-soft)] font-medium">
                  <Building2 size={12} className="text-slate-400" />
                  {doctor.clinic}
                </div>
              )}
              {doctor.distanceKm !== undefined && (
                <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-muted)] font-medium">
                  <MapPin size={12} className="text-brand-400" />
                  {doctor.distanceKm.toFixed(1)} km away
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
            </div>
          </div>

          {/* Rich Metrics row */}
          <div className="flex items-center mt-3 bg-slate-50 rounded-lg p-2 border border-slate-100">
            <div className="flex flex-col items-center flex-1 border-r border-slate-200">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">Exp</span>
              <span className="text-sm font-bold text-[var(--color-text)]">{doctor.experience} Yrs</span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-slate-200">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">Patients</span>
              <span className="text-sm font-bold text-[var(--color-text)]">{doctor.totalConsults || '500+'}</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">Rating</span>
              <span className="text-sm font-bold text-green-600">{doctor.patientSatisfaction || '95%'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="flex items-center gap-1.5 mt-3">
        <Languages size={12} className="text-[var(--color-muted)]" />
        <span className="text-xs text-[var(--color-muted)]">
          {doctor.languages.join(', ')}
        </span>
      </div>

      {/* Next slot & Urgency */}
      <div className="flex items-center justify-between mt-3 bg-brand-50/50 p-2.5 rounded-xl border border-brand-100">
        <div className="flex items-center gap-2">
          {doctor.available ? (
             <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
             </div>
          ) : (
             <Clock size={12} className="text-brand-500" />
          )}
          <span className={`text-xs font-bold ${doctor.available ? 'text-success-700' : 'text-brand-700'}`}>
            {doctor.available ? 'Connect in 5 mins' : `Next: ${doctor.nextSlot}`}
          </span>
        </div>

        {/* Consultation type icons */}
        <div className="flex items-center gap-1">
          {doctor.consultationTypes.includes('video') && (
            <div className="w-6 h-6 bg-brand-50 rounded-md flex items-center justify-center">
              <Video size={12} className="text-brand-500" />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-white"
          onClick={handleView}
          id={`view-doctor-${doctor.id}`}
        >
          View Profile
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-[1.5] shadow-md shadow-brand-500/20"
          onClick={handleBook}
          disabled={!doctor.available}
          id={`book-doctor-${doctor.id}`}
        >
          {doctor.available ? 'Consult Now' : 'Schedule'}
        </Button>
      </div>
    </Card>
  )
}

export default DoctorCard
