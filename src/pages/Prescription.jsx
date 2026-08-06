// src/pages/Prescription.jsx
// ─────────────────────────────────────────────────────────────
// Digital Prescription View.
// Shows medicines, dosages, and doctor notes.
// ─────────────────────────────────────────────────────────────

import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Button, Avatar } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { FileText, Download, Share2, Pill, Clock, AlertCircle } from 'lucide-react'
import doctorsData from '@/data/doctors.json'

const MOCK_PRESCRIPTION = {
  id: 'RX-789012',
  date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  diagnosis: 'Viral Fever with Mild Dehydration',
  medicines: [
    { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice a day', duration: '3 days', instruction: 'After meals', icon: Pill },
    { name: 'ORS Powder', dosage: '1 sachet', frequency: 'As needed', duration: '2 days', instruction: 'Mix in 1L clean water', icon: Clock }
  ],
  advice: 'Rest for 2 days. Drink plenty of fluids. Come back if fever persists beyond 3 days.',
  followUp: 'After 3 days if no improvement'
}

const Prescription = () => {
  const { user } = useApp()
  // Mocking the doctor as the first one for the prototype
  const doctor = doctorsData[0]

  return (
    <>
      <TopBar 
        title="Prescription" 
        right={
          <div className="flex gap-2">
            <button className="p-2 text-[#25D366] bg-green-50 hover:bg-green-100 rounded-full transition-colors" title="Share via WhatsApp"><Share2 size={18} /></button>
            <button className="p-2 text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-full transition-colors"><Download size={18} /></button>
          </div>
        }
      />
      <PageWrapper className="pt-14 pb-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mt-2">
          
          {/* Header Card */}
          <Card className="p-4 bg-white border-t-4 border-t-brand-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-50 rounded-full opacity-50 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-lg text-[var(--color-text)]">Sehat Saathi Clinic</h2>
                <p className="text-xs text-[var(--color-muted)]">Rx No: {MOCK_PRESCRIPTION.id}</p>
                <p className="text-xs text-[var(--color-muted)]">Date: {MOCK_PRESCRIPTION.date}</p>
              </div>
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-brand-600" />
              </div>
            </div>

            <div className="h-px bg-slate-100 my-4" />

            <div className="flex items-center gap-3">
              <Avatar src={doctor.avatar} name={doctor.name} size="md" />
              <div>
                <p className="text-sm font-bold">{doctor.name}</p>
                <p className="text-xs text-[var(--color-text-soft)]">{doctor.qualification}</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-4" />

            <div>
              <p className="text-xs text-[var(--color-muted)] mb-1">Patient Details</p>
              <p className="text-sm font-bold">{user.name}, {user.age} yrs, {user.gender}</p>
              <p className="text-xs text-[var(--color-text-soft)]">ID: {user.abhaId}</p>
            </div>
          </Card>

          {/* Diagnosis */}
          <Card className="p-4">
            <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Diagnosis</p>
            <p className="text-sm font-semibold text-[var(--color-text)]">{MOCK_PRESCRIPTION.diagnosis}</p>
          </Card>

          {/* Medicines */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">Medicines</p>
            </div>
            <div className="flex flex-col divide-y divide-[var(--color-border)]">
              {MOCK_PRESCRIPTION.medicines.map((med, idx) => (
                <div key={idx} className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <med.icon size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text)]">{med.name}</p>
                    <p className="text-xs font-medium text-brand-600 mt-0.5">{med.dosage} • {med.frequency}</p>
                    <p className="text-[10px] text-[var(--color-muted)] mt-1">{med.instruction} • {med.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Doctor's Advice */}
          <Card className="p-4 bg-orange-50 border-orange-100">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-orange-800 mb-1">Doctor's Advice</p>
                <p className="text-sm text-orange-700 leading-relaxed">{MOCK_PRESCRIPTION.advice}</p>
                <p className="text-xs font-bold text-orange-800 mt-2">Follow up: <span className="font-medium">{MOCK_PRESCRIPTION.followUp}</span></p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-2">
            <Button variant="primary" fullWidth size="lg">Order Medicines</Button>
          </div>

        </div>
      </PageWrapper>
    </>
  )
}

export default Prescription
