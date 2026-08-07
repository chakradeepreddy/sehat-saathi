import { PageWrapper, TopBar } from '@/components/layout'
import { useApp } from '@/context/AppContext'

const AshaProfile = () => {
  const { user, logout } = useApp()

  return (
    <PageWrapper>
      <TopBar title="My Profile" />
      <div className="p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700 text-3xl font-display mb-4">
             {user?.name?.charAt(0) || 'A'}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{user?.name || 'ASHA Worker'}</h2>
          <p className="text-sm text-slate-500 mt-1">{user?.phone || '+91 98765 43210'}</p>
          <span className="mt-3 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
            Certified ASHA • Nabha Cluster
          </span>
        </div>

        <button 
          onClick={() => {
            logout();
            localStorage.removeItem('ss_role');
            window.location.href = '/';
          }}
          className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-xl transition-colors"
        >
          Sign Out
        </button>
      </div>
    </PageWrapper>
  )
}

export default AshaProfile
