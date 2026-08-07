import { PageWrapper, TopBar } from '@/components/layout'

const Reports = () => {
  return (
    <PageWrapper>
      <TopBar title="Health Reports" showBack />
      <div className="p-4 flex flex-col items-center justify-center h-[50vh] text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Village Analytics</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
          Generate and view health trends and statistics for your community.
        </p>
      </div>
    </PageWrapper>
  )
}

export default Reports
