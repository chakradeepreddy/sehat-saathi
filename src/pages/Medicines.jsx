import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Button, Modal } from '@/components/ui'
import { CheckCircle2, Circle, Pill, Plus, Calendar, Clock, AlertCircle, Trash2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'



const Medicines = () => {
  const navigate = useNavigate()
  const { t, medicines, addMedicine, removeMedicine, toggleMedicineStatus } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newMed, setNewMed] = useState({ name: '', time: '', type: 'After food', dosage: '1 Tablet' })

  const handleAddMedicine = () => {
    if (!newMed.name || !newMed.time) return
    
    // Parse time to get period
    const hour = parseInt(newMed.time.split(':')[0], 10)
    let period = 'Morning'
    if (hour >= 12 && hour < 17) period = 'Afternoon'
    else if (hour >= 17) period = 'Night'

    addMedicine({
      id: Date.now(),
      name: newMed.name,
      time: newMed.time,
      period,
      type: newMed.type,
      status: 'upcoming',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dosage: newMed.dosage || '1 Tablet'
    })
    setShowAddModal(false)
    setNewMed({ name: '', time: '', type: 'After food', dosage: '1 Tablet' })
  }

  const takenCount = (medicines || []).filter(m => m.status === 'taken').length
  const totalCount = (medicines || []).length
  const progressPercent = totalCount === 0 ? 0 : Math.round((takenCount / totalCount) * 100)

  return (
    <>
      <TopBar title={t('dash.medReminder') || 'Medicine Reminder'} onBack={() => navigate(-1)} />
      <PageWrapper className="pt-14 pb-28">
        <div className="max-w-xl mx-auto px-4 mt-6">
          
          {/* Header & Progress */}
          <div className="bg-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-500/20 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-brand-100 font-medium text-sm mb-1 flex items-center gap-1.5">
                  <Calendar size={14} /> Today, 6 Aug
                </p>
                <h2 className="text-2xl font-display font-bold">Your Schedule</h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-display font-bold">{takenCount}<span className="text-brand-200 text-xl">/{totalCount}</span></p>
                <p className="text-brand-100 text-xs font-medium uppercase tracking-wider mt-1">Completed</p>
              </div>
            </div>
            
            <div className="mt-5 bg-black/20 h-2 rounded-full overflow-hidden relative z-10">
              <div 
                className="bg-white h-full rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Date Tabs (Mock UI) */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
            {['Yesterday', 'Today', 'Tomorrow', 'Thu, 8 Aug'].map((day, i) => (
              <button 
                key={i} 
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                  day === 'Today' 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'bg-white text-[var(--color-text-soft)] border border-slate-200 hover:border-brand-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Medicines List */}
          <div className="flex flex-col gap-4 mt-2">
            {(medicines || []).map((med) => {
              const isTaken = med.status === 'taken'
              const isMissed = med.status === 'missed'
              
              return (
                <Card 
                  key={med.id} 
                  interactive 
                  onClick={() => toggleMedicineStatus(med.id)}
                  className={`transition-all duration-300 border-l-4 ${
                    isTaken 
                      ? 'bg-green-50/40 border-l-green-500 border-y-transparent border-r-transparent' 
                      : isMissed
                        ? 'bg-red-50/40 border-l-red-500 border-y-transparent border-r-transparent'
                        : 'border-l-brand-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                        isTaken 
                          ? 'text-green-500' 
                          : isMissed
                            ? 'text-red-400 hover:text-green-500'
                            : 'text-slate-300 hover:text-brand-400'
                      }`}
                    >
                      {isTaken ? <CheckCircle2 size={28} /> : isMissed ? <AlertCircle size={28} /> : <Circle size={28} />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-bold text-[var(--color-text)] ${isTaken ? 'line-through opacity-60' : ''}`}>
                        {med.name}
                      </p>
                      <div className={`flex items-center gap-2 mt-1 text-xs font-semibold ${
                        isMissed && !isTaken ? 'text-red-500' : 'text-[var(--color-muted)]'
                      }`}>
                        <span className="flex items-center gap-1"><Clock size={12} /> {med.time}</span>
                        <span>•</span>
                        <span>{med.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 bg-slate-100 px-3 py-1 rounded-lg">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{med.period}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeMedicine(med.id); }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

        </div>
      </PageWrapper>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-[calc(var(--total-bottom-offset)+1rem)] right-4 lg:bottom-8 lg:right-8 w-14 h-14 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-500/30 hover:scale-105 transition-all duration-300 z-30"
      >
        <Plus size={24} strokeWidth={3} />
      </button>

      {/* Add Medicine Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Medicine" size="sm">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block">Medicine Name</label>
            <input type="text" placeholder="e.g. Dolo 650" value={newMed.name} onChange={(e) => setNewMed({...newMed, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold outline-none focus:border-brand-500" />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block">Dosage</label>
              <input type="text" placeholder="e.g. 1 Tablet" value={newMed.dosage} onChange={(e) => setNewMed({...newMed, dosage: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold outline-none focus:border-brand-500" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block">Time</label>
              <input type="time" value={newMed.time} onChange={(e) => setNewMed({...newMed, time: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold outline-none focus:border-brand-500" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block">Instructions</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setNewMed({...newMed, type: 'Before food'})}
                className={`py-2 text-sm font-semibold rounded-lg transition-colors ${newMed.type === 'Before food' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Before food
              </button>
              <button 
                onClick={() => setNewMed({...newMed, type: 'After food'})}
                className={`py-2 text-sm font-semibold rounded-lg transition-colors ${newMed.type === 'After food' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                After food
              </button>
            </div>
          </div>
          
          <Button variant="primary" fullWidth className="mt-2" onClick={handleAddMedicine}>
            Save Medicine
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Medicines
