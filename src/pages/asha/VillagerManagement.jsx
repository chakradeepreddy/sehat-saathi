import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, UserPlus, Phone, Calendar, HeartPulse, ChevronRight } from 'lucide-react'
import { PageWrapper, TopBar } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import ashaVillagers from '@/data/ashaVillagers.json'
import { ROUTES } from '@/constants'

const VillagerManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVillagers = ashaVillagers.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone.includes(searchTerm)
  )

  return (
    <PageWrapper>
      <TopBar title="Villager Directory" showBack />
      
      <div className="px-4 py-4 pb-24 max-w-2xl mx-auto">
        {/* Search & Actions */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm"
            />
          </div>
          <button className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
            <UserPlus size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filteredVillagers.length > 0 ? (
            filteredVillagers.map((villager) => (
              <Card key={villager.id} interactive className="p-4" onClick={() => navigate(`${ROUTES.ASHA_VILLAGERS}/${villager.id}`)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 font-display text-lg">
                      {villager.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{villager.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {villager.age} yrs • {villager.gender} • Blood: {villager.bloodGroup}
                      </p>
                    </div>
                  </div>
                  {villager.riskLevel === 'High' && (
                    <Badge variant="danger" size="xs">High Risk</Badge>
                  )}
                  {villager.riskLevel === 'Medium' && (
                    <Badge variant="warning" size="xs">Medium Risk</Badge>
                  )}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <HeartPulse size={12} className="text-brand-500 shrink-0" />
                    <span className="truncate">{villager.conditions[0] || 'No conditions'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <Calendar size={12} className="text-brand-500 shrink-0" />
                    <span className="truncate">Next: {new Date(villager.nextVisit).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${villager.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-600 py-1 hover:text-brand-700 transition-colors"
                  >
                    <Phone size={14} />
                    {villager.phone}
                  </a>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </Card>
            ))
          ) : (
             <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <p className="text-sm text-slate-500 font-medium">No villagers found.</p>
             </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default VillagerManagement
