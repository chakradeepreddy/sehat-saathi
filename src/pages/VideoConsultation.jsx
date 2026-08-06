// src/pages/VideoConsultation.jsx
// ─────────────────────────────────────────────────────────────
// Simulated video call interface.
// Shows a full-screen remote video (doctor) and PiP local video.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { ROUTES } from '@/constants'
import doctorsData from '@/data/doctors.json'

const VideoConsultation = () => {
  const { id } = useParams() // Expecting a doctor ID or appointment ID. We'll simulate finding doctor by ID.
  const navigate = useNavigate()
  const { user } = useApp()

  // For this prototype, we'll try to find the doctor from data. 
  // If no param is passed, default to Harpreet.
  const doctor = doctorsData.find((d) => d.id === id) || doctorsData[0]

  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleEndCall = () => {
    // Navigate to a simulated prescription view for this doctor
    navigate(ROUTES.PRESCRIPTION)
  }

  return (
    <div className="relative h-[100dvh] w-full bg-slate-900 overflow-hidden flex flex-col">
      
      {/* ── Remote Video (Doctor) ────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full object-cover opacity-80"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop')`, // generic doctor background
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        {/* Simulating doctor avatar in center if video was actually off, but we'll leave it as a live view */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-2xl mb-4">
            <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover bg-white" />
          </div>
        </div>
      </div>

      {/* ── Top Info Bar ─────────────────────────────────────── */}
      <div className="relative z-10 w-full p-4 bg-gradient-to-b from-black/70 to-transparent flex items-start justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">{doctor.name}</h2>
          <p className="text-white/80 text-sm">{formatTime(callDuration)} • Secure Call</p>
        </div>
      </div>

      {/* ── Local Video (Patient PiP) ────────────────────────── */}
      <div className="absolute top-4 right-4 z-20 w-28 h-40 bg-black rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
        {!isVideoOff ? (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url('${user.avatar}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <span className="text-white text-xs">Video Off</span>
          </div>
        )}
      </div>

      <div className="flex-1" /> {/* Spacer */}

      {/* ── Bottom Controls ──────────────────────────────────── */}
      <div className="relative z-10 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-10">
        <div className="max-w-xs mx-auto flex items-center justify-between">
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-slate-700/80 text-white backdrop-blur-md'
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isVideoOff ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-slate-700/80 text-white backdrop-blur-md'
            }`}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>

          <button 
            className="w-14 h-14 rounded-full bg-slate-700/80 text-white backdrop-blur-md flex items-center justify-center transition-all hover:bg-slate-600/80"
          >
            <MessageSquare size={24} />
          </button>

          <button 
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all"
          >
            <PhoneOff size={28} />
          </button>

        </div>
      </div>
    </div>
  )
}

export default VideoConsultation
