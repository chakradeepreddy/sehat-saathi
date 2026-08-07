// src/pages/DoctorProfile.jsx
// ─────────────────────────────────────────────────────────────
// Full doctor profile — shows everything about a doctor
// before the patient commits to booking.
//
// Layout:
//   • Hero gradient header with avatar
//   • Stats strip: rating, experience, patients, fee
//   • About section
//   • Expertise tags
//   • Languages + consultation types
//   • Mock reviews (2 reviews to show social proof)
//   • Sticky Book Now footer
// ─────────────────────────────────────────────────────────────

import { useParams, useNavigate } from 'react-router-dom'
import {
  Star, Clock, Languages, Video, Phone as PhoneIcon,
  MessageSquare, MapPin, Calendar, ChevronRight,
  Award, Users, ThumbsUp, CheckCircle2, ShieldCheck
} from 'lucide-react'
import { Card, Badge, Avatar, Button } from '@/components/ui'
import { TopBar }                      from '@/components/layout'
import doctorsData                     from '@/data/doctors.json'

// ── Mock reviews — not in JSON, generated here ────────────────────────────────
const MOCK_REVIEWS = {
  d001: [
    { name: 'Manjit Kaur',   rating: 5, date: '2 days ago',   text: 'Very thorough and patient. Explained everything in Punjabi which was very helpful for my elderly mother.' },
    { name: 'Gurpreet Singh', rating: 5, date: '1 week ago',   text: 'Excellent doctor. Got video consultation and it was exactly like meeting in person. Prescribed correct medicines.' },
  ],
  d002: [
    { name: 'Poonam Devi',   rating: 5, date: '3 days ago',   text: 'Dr. Priya is very gentle and caring. She made me feel comfortable throughout my pregnancy checkup.' },
    { name: 'Harleen Kaur',  rating: 5, date: '2 weeks ago',  text: 'Best gynecologist in Nabha. She runs free camps in our village too. Very dedicated doctor.' },
  ],
  d003: [
    { name: 'Ranjit Singh',  rating: 5, date: '5 days ago',   text: 'My son had fever for 3 days. Dr. Gurjeet diagnosed immediately and within 2 days he was completely fine.' },
    { name: 'Simran Bhatia', rating: 4, date: '1 week ago',   text: 'Very knowledgeable and kind. Explained the vaccination schedule clearly in Punjabi.' },
  ],
  d004: [
    { name: 'Balwinder Singh', rating: 5, date: '1 week ago', text: 'Had severe back pain from farming work. Dr. Rajesh gave exact diagnosis and the treatment worked perfectly.' },
    { name: 'Nirmal Kaur',    rating: 4, date: '3 weeks ago', text: 'Good doctor. Wait time is sometimes long but quality of consultation is excellent.' },
  ],
  d005: [
    { name: 'Anita Kumari',  rating: 5, date: '4 days ago',   text: 'Had skin allergy from pesticides used in fields. Dr. Sunita understood the problem immediately and gave the right treatment.' },
    { name: 'Deepak Sharma', rating: 4, date: '2 weeks ago',  text: 'Good consultation. Prescribed affordable generic medicines which worked perfectly.' },
  ],
  d006: [
    { name: 'Sukhwinder Singh', rating: 5, date: '1 day ago', text: 'Dr. Amarjit detected my heart issue early during a village camp. He literally saved my life. Forever grateful.' },
    { name: 'Karamjit Kaur',   rating: 5, date: '4 days ago', text: 'Very experienced and professional. Explained my ECG report in simple language I could understand.' },
  ],
}

const TYPE_ICONS = {
  video: { icon: Video,          label: 'Video Call' },
  audio: { icon: PhoneIcon,      label: 'Audio Call' },
  chat:  { icon: MessageSquare,  label: 'Chat' },
}

const DoctorProfile = () => {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const doctor    = doctorsData.find((d) => d.id === id)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">👨‍⚕️</p>
          <p className="font-semibold text-[var(--color-text)]">Doctor not found</p>
          <button onClick={() => navigate(-1)} className="text-brand-600 text-sm mt-2 font-medium">
            ← Go back
          </button>
        </div>
      </div>
    )
  }

  const reviews = MOCK_REVIEWS[id] || MOCK_REVIEWS.d001

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-28">

      {/* ── Hero header ──────────────────────────────────── */}
      <div
        className="relative pt-12 pb-20 px-5 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0c4a6e 0%, #0284c7 55%, #0ea5e9 100%)',
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
          aria-label="Go back"
        >
          <ChevronRight size={16} className="text-white rotate-180" />
        </button>

        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Doctor name + specialization */}
        <div className="text-center mt-2">
          <p className="text-brand-200 text-xs font-semibold uppercase tracking-wider mb-2">
            {doctor.specialization}
          </p>
          <h1 className="text-white font-display font-bold text-2xl leading-tight">
            {doctor.name}
          </h1>
          <p className="text-white/70 text-sm mt-1">{doctor.qualification}</p>
          <div className="flex items-center justify-center mt-2 mb-1">
            <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-100 border border-green-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-sm">
              <ShieldCheck size={12} className="text-green-300" />
              Verified by NMC
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <MapPin size={13} className="text-white/60" />
            <p className="text-white/60 text-xs">{doctor.clinic} · {doctor.location}</p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 375 32" fill="none" className="w-full">
            <path d="M0 32L375 32L375 10C280 32 95 -4 0 10L0 32Z" fill="var(--color-surface)" />
          </svg>
        </div>
      </div>

      {/* ── Avatar (overlapping hero and content) ────────── */}
      <div className="flex justify-center -mt-14 relative z-10 mb-4">
        <div className="relative">
          <Avatar
            src={doctor.avatar}
            name={doctor.name}
            size="xl"
            online={doctor.available}
            className="ring-4 ring-white shadow-xl"
          />
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="px-4 max-w-3xl mx-auto flex flex-col gap-4">

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Rating',     value: doctor.rating,               icon: '⭐', suffix: '' },
            { label: 'Experience', value: doctor.experience,            icon: '🏥', suffix: 'yrs' },
            { label: 'Reviews',    value: doctor.reviewCount,           icon: '💬', suffix: '' },
            { label: 'Fee',        value: `₹${doctor.fee}`,            icon: '💰', suffix: '' },
          ].map(({ label, value, icon, suffix }) => (
            <div key={label} className="bg-[var(--color-surface-2)] rounded-2xl p-3 text-center border border-[var(--color-border)]">
              <p className="text-lg">{icon}</p>
              <p className="text-sm font-bold text-[var(--color-text)] mt-1">
                {value}{suffix}
              </p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Availability banner */}
        <div className={[
          'flex items-center gap-3 p-4 rounded-2xl',
          doctor.available ? 'bg-success-50 border border-success-200' : 'bg-orange-50 border border-orange-200',
        ].join(' ')}>
          <Clock size={18} className={doctor.available ? 'text-success-600' : 'text-orange-500'} />
          <div>
            <p className={`text-sm font-semibold ${doctor.available ? 'text-success-700' : 'text-orange-700'}`}>
              {doctor.available ? 'Available Today' : 'Next Available'}
            </p>
            <p className={`text-xs mt-0.5 ${doctor.available ? 'text-success-600' : 'text-orange-600'}`}>
              {doctor.nextSlot}
            </p>
          </div>
          <Badge variant={doctor.available ? 'available' : 'warning'} className="ml-auto" dot>
            {doctor.available ? 'Online' : 'Scheduled'}
          </Badge>
        </div>

        {/* About */}
        <Card className="p-4">
          <h2 className="text-sm font-display font-bold text-[var(--color-text)] mb-2 flex items-center gap-2">
            <Award size={15} className="text-brand-500" />
            About
          </h2>
          <p className="text-sm text-[var(--color-text-soft)] leading-relaxed">
            {doctor.about}
          </p>
        </Card>

        {/* Expertise */}
        <Card className="p-4">
          <h2 className="text-sm font-display font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-brand-500" />
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {doctor.expertise.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold border border-brand-100"
              >
                <CheckCircle2 size={11} className="text-brand-500" />
                {item}
              </div>
            ))}
          </div>
        </Card>

        {/* Languages & Consultation Types */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <h3 className="text-xs font-bold text-[var(--color-text)] mb-3 flex items-center gap-1.5">
              <Languages size={14} className="text-brand-500" />
              Languages
            </h3>
            <div className="flex flex-col gap-1.5">
              {doctor.languages.map((lang) => (
                <div key={lang} className="flex items-center gap-2 text-xs text-[var(--color-text-soft)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  {lang}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-xs font-bold text-[var(--color-text)] mb-3 flex items-center gap-1.5">
              <Video size={14} className="text-brand-500" />
              Consult Via
            </h3>
            <div className="flex flex-col gap-1.5">
              {doctor.consultationTypes.map((type) => {
                const { icon: Icon, label } = TYPE_ICONS[type] || {}
                return (
                  <div key={type} className="flex items-center gap-2 text-xs text-[var(--color-text-soft)]">
                    {Icon && <Icon size={12} className="text-brand-400" />}
                    {label}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Patient Reviews */}
        <div>
          <h2 className="text-sm font-display font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
            <ThumbsUp size={15} className="text-brand-500" />
            Patient Reviews
            <Badge variant="primary" size="xs">{doctor.reviewCount}+</Badge>
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((review, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={review.name} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[var(--color-text)]">{review.name}</p>
                      <span className="text-[10px] text-[var(--color-muted)]">{review.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={11}
                          className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[var(--color-text-soft)] leading-relaxed mt-2">
                      {review.text}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Book Now footer ────────────────────────── */}
      <div className="fixed bottom-safe-nav lg:bottom-0 left-0 lg:left-64 right-0 z-30 p-4 max-w-3xl mx-auto transition-all duration-300">
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div>
            <p className="text-xs text-[var(--color-muted)]">Consultation fee</p>
            <p className="text-xl font-bold text-brand-700">₹{doctor.fee}</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate(`/doctors/${id}/book`)}
            id={`book-now-${id}`}
            leftIcon={<Calendar size={18} />}
          >
            {doctor.available ? 'Book Appointment' : 'Schedule Visit'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
