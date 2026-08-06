// src/pages/PrescriptionsList.jsx
// ─────────────────────────────────────────────────────────────
// Displays a list of all past prescriptions for the user.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import prescriptions from '@/data/prescriptions.json'

const PrescriptionsList = () => {
  const navigate = useNavigate()

  return (
    <>
      <TopBar title="My Prescriptions" showBack={false} />
      <PageWrapper className="pt-14 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mt-4 px-4 lg:px-0">
          
          {prescriptions.map(rx => (
            <Card
              key={rx.id}
              interactive
              className="p-4"
              onClick={() => navigate(`/prescriptions/${rx.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--color-text)] truncate">{rx.diagnosis}</h3>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {rx.doctorName} · {rx.date}
                  </p>
                </div>
                <ChevronRight size={18} className="text-[var(--color-muted)]" />
              </div>
              <div className="flex gap-2 mt-4 flex-wrap bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {rx.medicines.slice(0, 3).map((m, i) => (
                  <Badge key={i} variant="primary" size="xs">{m.name.split(' ')[0]}</Badge>
                ))}
                {rx.medicines.length > 3 && (
                  <Badge variant="default" size="xs">+{rx.medicines.length - 3} more</Badge>
                )}
              </div>
            </Card>
          ))}

        </div>
      </PageWrapper>
    </>
  )
}

export default PrescriptionsList
