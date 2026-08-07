import { useParams } from 'react-router-dom'
import { PageWrapper, TopBar } from '@/components/layout'
import ashaVillagers from '@/data/ashaVillagers.json'

const VillagerProfile = () => {
  const { id } = useParams()
  const villager = ashaVillagers.find(v => v.id === id)

  if (!villager) return <div className="p-4 text-center mt-20 font-bold">Villager not found</div>

  return (
    <PageWrapper>
      <TopBar title={`${villager.name}'s Profile`} showBack />
      <div className="p-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
           <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-2xl font-display">
             {villager.name.charAt(0)}
           </div>
           <div>
             <h2 className="text-lg font-bold text-slate-900">{villager.name}</h2>
             <p className="text-sm text-slate-500 mt-0.5">{villager.age} yrs • {villager.gender}</p>
             <p className="text-sm text-brand-600 font-bold mt-1">{villager.phone}</p>
           </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Health Profile</h3>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
           <div>
             <p className="text-xs text-slate-500">Blood Group</p>
             <p className="font-bold text-slate-800">{villager.bloodGroup}</p>
           </div>
           <div>
             <p className="text-xs text-slate-500">Risk Level</p>
             <p className={`font-bold ${villager.riskLevel === 'High' ? 'text-red-600' : villager.riskLevel === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
               {villager.riskLevel}
             </p>
           </div>
           <div className="col-span-2 mt-2">
             <p className="text-xs text-slate-500 mb-1">Diagnosed Conditions</p>
             <div className="flex flex-wrap gap-2">
               {villager.conditions.map(c => (
                 <span key={c} className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">{c}</span>
               ))}
             </div>
           </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default VillagerProfile
