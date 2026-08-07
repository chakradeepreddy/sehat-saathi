// src/pages/AISymptomChecker.jsx
// ─────────────────────────────────────────────────────────────
// Chat-based interface for the AI Symptom Checker.
// Uses Gemini API via backend proxy. Displays structured output.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, AlertTriangle, ShieldAlert, HeartPulse, Sparkles, ChevronRight, Info, Mic, CheckCircle2, Activity, Clock, FileText, CheckCircle, AlertOctagon, Network, ImagePlus, X } from 'lucide-react'
import { TopBar, PageWrapper } from '@/components/layout'
import { Button } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { useGemini } from '@/hooks/useGemini'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { DoctorCard } from '@/components/shared'
import doctorsData from '@/data/doctors.json'
import phcsData from '@/data/phcs.json'

const Typewriter = ({ text, delay = 20 }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span>{currentText}</span>
}

const StreamingTier = ({ children, delay = 0 }) => {
  const { isLowBandwidthMode } = useApp()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (isLowBandwidthMode) {
      setVisible(true)
      return
    }
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay, isLowBandwidthMode])
  
  if (!visible) return null
  return <div className={isLowBandwidthMode ? "" : "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards"}>{children}</div>
}

const COMMON_SYMPTOMS = [
  "High Fever", "Dry Cough", "Stomach Ache", 
  "Severe Headache", "Body Ache", "Skin Rash", "Vomiting"
]

const AISymptomChecker = () => {
  const { user, isLowBandwidthMode } = useApp()
  const { analyzeSymptoms, loading, error } = useGemini()
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  
  // Image Upload State
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage({
          file,
          dataUrl: reader.result,
          mimeType: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleSuggestionClick = (symp) => {
    setInput(prev => {
      const trimmed = prev.trim()
      return trimmed ? `${trimmed}, ${symp}` : symp
    })
  }

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      type: 'text',
      content: `Namaste ${user.name.split(' ')[0]}! I am your AI Health Assistant.\n\nPlease describe your symptoms in detail (e.g., "I have had a high fever and body ache for 3 days"). I will help you understand what might be wrong and who you should consult.`
    }
  ])

  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')

    // Add user message
    const currentText = text
    const currentImage = selectedImage
    
    setInput('')
    setSelectedImage(null)

    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      role: 'user', 
      type: 'text', 
      content: currentText,
      image: currentImage?.dataUrl
    }])

    // Epidemic Intelligence Check (Mock for Prototype)
    const lowerText = text.toLowerCase();
    const isOutbreakDetected = lowerText.includes('dengue') || (lowerText.includes('fever') && lowerText.includes('joint pain')) || (lowerText.includes('fever') && lowerText.includes('mosquito'));

    // Call API
    try {
      const patientContext = {
        age: user.age,
        gender: user.gender,
        existingConditions: user.medicalHistory
      }
      
      const response = await analyzeSymptoms(
        currentText || "Analyze this image", 
        patientContext, 
        currentImage?.dataUrl, 
        currentImage?.mimeType
      )
      
      // Add AI response as structured card
      setMessages(prev => {
        const newMsgs = [...prev];
        if (isOutbreakDetected) {
          newMsgs.push({
            id: Date.now().toString() + '_outbreak',
            role: 'system_alert',
            type: 'outbreak',
            content: 'Potential Dengue cluster detected in your area based on recent symptom patterns. Anonymized data has been sent to the local CMO.'
          });
        }
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          role: 'ai',
          type: 'structured',
          data: response
        });
        return newMsgs;
      })
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          type: 'error',
          content: 'Sorry, I am having trouble connecting to the network right now. Please try again later.'
        }
      ])
    }
  }

  const handleMicClick = () => {
    setIsListening(true)
    setInput('')
    // Simulate listening for 2.5 seconds
    setTimeout(() => {
      setIsListening(false)
      setInput('I have had a high fever and severe headache for the past 3 days.')
    }, 2500)
  }

  const renderMessage = (msg) => {
    const isAi = msg.role === 'ai'

    if (msg.type === 'outbreak') {
      return (
        <div key={msg.id} className="w-full flex justify-center my-2">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 max-w-[85%] flex items-start gap-3 shadow-sm">
            <div className="bg-orange-100 p-2 rounded-full shrink-0 mt-0.5">
              <Network size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-orange-600 mb-0.5">Epidemic Intelligence Alert</p>
              <p className="text-xs font-medium text-orange-800 leading-relaxed">{msg.content}</p>
            </div>
          </div>
        </div>
      )
    }

    if (msg.type === 'structured' && msg.data) {
      const { data } = msg
      const isEmergency = data.isEmergency || data.urgencyLevel === 'EMERGENCY'
      
      const suggestedDoctor = data.doctorId ? doctorsData.find(d => d.id === data.doctorId) : null
      
      return (
        <div key={msg.id} className="flex gap-2.5 max-w-[95%]" style={{ animation: 'fadeInUp 0.4s var(--ease-apple) both' }}>
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 shadow-sm border border-brand-200">
            <Sparkles size={16} className="text-brand-600" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            
            {/* Trust Indicator */}
            <StreamingTier delay={0}>
              <div className="flex items-center gap-1.5 px-1 mb-1">
                <CheckCircle2 size={12} className="text-brand-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified by Gemini Medical AI</span>
              </div>
            </StreamingTier>

            {/* Emergency Banner */}
            {isEmergency && (
              <StreamingTier delay={500}>
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 shadow-sm animate-pulse-slow">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full shrink-0">
                      <ShieldAlert size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-red-700 tracking-tight">CRITICAL EMERGENCY POSSIBLE</p>
                      <p className="text-xs text-red-600 mt-1 font-medium">{data.emergencyMessage || "Please seek immediate medical attention or call an ambulance."}</p>
                      <div className="mt-4 flex gap-3">
                        <Button variant="danger" size="sm" onClick={() => window.location.href = 'tel:108'} className="shadow-md">
                          Call 108 (Ambulance)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </StreamingTier>
            )}

            <div className="flex flex-col gap-3">
              
              {/* Executive Summary Tier */}
              <StreamingTier delay={isEmergency ? 1500 : 500}>
                <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    data.urgencyLevel === 'HIGH' || isEmergency ? 'bg-red-500' :
                    data.urgencyLevel === 'MODERATE' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={16} className={
                      data.urgencyLevel === 'HIGH' || isEmergency ? 'text-red-500' :
                      data.urgencyLevel === 'MODERATE' ? 'text-orange-500' : 'text-green-500'
                    } />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Triage Assessment
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed mb-3">
                    {data.triageSummary}
                  </p>
                  {data.localTranslation && (
                    <div className="bg-brand-50/50 border border-brand-100/50 rounded-xl p-3 mb-3">
                      <p className="text-[13px] font-medium text-brand-800 leading-relaxed font-sans" dir="auto">
                        {data.localTranslation}
                      </p>
                    </div>
                  )}
                  {data.timeline && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100/50 rounded-lg px-2.5 py-1.5 w-fit">
                      <Clock size={12} />
                      <span>{data.timeline}</span>
                    </div>
                  )}
                </div>
              </StreamingTier>

              {/* Possible Causes Tier */}
              {data.possibleConditions?.length > 0 && (
                <StreamingTier delay={isEmergency ? 2500 : 1500}>
                  <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Possible Causes</p>
                    <div className="flex flex-col gap-4">
                      {data.possibleConditions.map((cond, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-slate-800">{cond.name}</span>
                            <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">{cond.probability}% MATCH</span>
                          </div>
                          {/* Progress Bar */}
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-500 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${cond.probability}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{cond.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </StreamingTier>
              )}

              {/* Action Plan Tier */}
              <StreamingTier delay={isEmergency ? 3500 : 2500}>
                <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Plan</p>
                  
                  {/* Red Flags */}
                  {data.redFlags?.length > 0 && (
                    <div className="bg-red-50/80 rounded-xl p-3 border border-red-100">
                      <div className="flex items-center gap-1.5 mb-2">
                        <AlertOctagon size={14} className="text-red-600" />
                        <span className="text-xs font-bold text-red-800">Red Flags (Seek Immediate Care if:)</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {data.redFlags.map((flag, i) => (
                          <li key={i} className="text-xs font-medium text-red-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                            <span className="leading-tight">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Home Care */}
                  {data.homeCareRecommendations?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <CheckCircle size={14} className="text-green-600" />
                        <span className="text-xs font-bold text-slate-700">Home Care Recommendations</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {data.homeCareRecommendations.map((rec, i) => (
                          <li key={i} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                            <span className="leading-tight">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Doctor Prep */}
                  {data.doctorPrep && (
                    <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <FileText size={14} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-800">What to tell your doctor</span>
                      </div>
                      <p className="text-xs font-medium text-blue-700 leading-relaxed">{data.doctorPrep}</p>
                    </div>
                  )}
                </div>
              </StreamingTier>

              {/* Next Steps Tier */}
              <StreamingTier delay={isEmergency ? 4500 : 3500}>
                <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                  {/* Subtle mesh background element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-200/50 rounded-full blur-3xl mix-blend-multiply" />
                  
                  <p className="text-xs font-bold text-brand-700 mb-1 relative z-10">Suggested Next Step</p>
                  <p className="text-sm text-brand-900 mb-4 font-medium relative z-10">
                    Based on these symptoms, consult a <strong>{data.suggestedSpecialist || "General Physician"}</strong>.
                  </p>
                  
                  {suggestedDoctor && (
                    <div className="mb-4 relative z-10 bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-white">
                      <DoctorCard doctor={suggestedDoctor} mode="compact" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 relative z-10">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      fullWidth 
                      className="shadow-sm font-bold"
                      onClick={() => navigate(ROUTES.DOCTOR_DIRECTORY)}
                    >
                      {isLowBandwidthMode ? 'Audio Consult (Low Data)' : 'Book Consultation'}
                    </Button>
                    <Button 
                      variant={reportSent ? "outline" : "secondary"}
                      size="sm" 
                      fullWidth 
                      className={reportSent ? "bg-green-50 text-green-700 border-green-200 pointer-events-none font-bold" : "bg-white border border-[var(--color-border)] shadow-sm font-bold"}
                      onClick={() => setReportSent(true)}
                    >
                      {reportSent ? (
                        <><CheckCircle2 size={14} className="mr-1.5" /> Report Sent to Doctor</>
                      ) : (
                        "Share Report with Doctor"
                      )}
                    </Button>
                  </div>
                </div>
              </StreamingTier>
            </div>
            
            {/* Disclaimer */}
            <StreamingTier delay={isEmergency ? 5500 : 4500}>
              <p className="text-[10px] text-slate-400 flex items-start gap-1.5 px-2">
                <Info size={12} className="shrink-0 mt-0.5" />
                {data.disclaimer}
              </p>
            </StreamingTier>
          </div>
        </div>
      )
    }

    return (
      <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isAi ? 'self-start' : 'self-end flex-row-reverse'}`} style={{ animation: 'fadeInUp 0.4s var(--ease-apple) both' }}>
        {isAi && (
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 border border-brand-200 shadow-sm mt-1">
            <Sparkles size={16} className="text-brand-600" />
          </div>
        )}
        <div className={[
          'px-5 py-3.5 text-sm whitespace-pre-wrap leading-relaxed shadow-sm border flex flex-col gap-2',
          isAi 
            ? 'bg-white/90 backdrop-blur-sm border-slate-200/60 rounded-2xl rounded-tl-sm text-slate-700 font-medium' 
            : 'bg-brand-600 border-brand-600 text-white rounded-2xl rounded-tr-sm font-medium'
        ].join(' ')}>
          {msg.image && (
            <img src={msg.image} alt="User uploaded" className="max-w-[200px] rounded-xl object-cover" />
          )}
          {isAi && msg.type === 'text' ? <Typewriter text={msg.content} /> : msg.content}
        </div>
      </div>
    )
  }

  return (
    <>
      <TopBar title="AI Symptom Checker" />

      <PageWrapper noPadding noNavOffset className="pt-14 pb-36 flex flex-col h-[100dvh] bg-[var(--color-surface-2)]">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 max-w-4xl mx-auto w-full">
          
          {/* Context Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-3 text-xs text-blue-700 mx-auto max-w-sm mb-2 shadow-sm">
            <Bot size={18} className="text-blue-500 shrink-0" />
            <p>
              I will use your medical profile (<strong>{user.age}, {user.gender}</strong>) to give personalized guidance.
            </p>
          </div>

          {messages.map(renderMessage)}

          {loading && (
            <div className="flex gap-2.5 max-w-[85%] self-start" style={{ animation: 'fadeInUp 0.4s var(--ease-apple) both' }}>
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-brand-600" />
              </div>
              <div className="bg-white border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                <div className="flex gap-1.5 px-1 py-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mx-auto max-w-sm text-center">
              {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="fixed bottom-safe-nav lg:bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-[var(--color-border)] p-3 z-20 flex flex-col gap-2.5 items-center transition-all duration-300">
          
          <div className="w-full max-w-4xl flex flex-col gap-2.5">
            
            {/* Image Preview Thumbnail */}
            {selectedImage && (
              <div className="relative self-start ml-4 mt-2">
                <img src={selectedImage.dataUrl} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-slate-200 shadow-sm" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            {/* Suggestions */}
            <div className="flex gap-2 overflow-x-auto pb-1 w-full" style={{ scrollbarWidth: 'none' }}>
            {COMMON_SYMPTOMS.map(symp => (
              <button
                key={symp}
                type="button"
                onClick={() => handleSuggestionClick(symp)}
                className="shrink-0 whitespace-nowrap px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-full text-xs font-medium active:bg-brand-100 transition-colors"
              >
                + {symp}
              </button>
            ))}
          </div>

          <form 
            onSubmit={handleSend}
            className="flex items-center gap-2 max-w-lg mx-auto w-full bg-[var(--color-surface-2)] rounded-full border border-[var(--color-border)] p-1.5 pl-4 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Describe your symptoms..."}
              disabled={loading || isListening}
              className={`flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[var(--color-muted)] text-[var(--color-text)] ${isListening ? 'animate-pulse text-brand-600 font-medium' : ''}`}
            />
            {isListening ? (
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
            ) : (
              <div className="flex gap-1 shrink-0">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-600 shrink-0 hover:bg-slate-100 transition-colors"
                  aria-label="Upload Image"
                >
                  <ImagePlus size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={loading}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-600 shrink-0 hover:bg-slate-100 transition-colors"
                  aria-label="Voice input"
                >
                  <Mic size={18} />
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || loading || isListening}
              className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 transition-colors"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default AISymptomChecker
