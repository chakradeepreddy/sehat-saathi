// src/pages/Profile.jsx
// ─────────────────────────────────────────────────────────────
// User profile and settings page.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { TopBar, PageWrapper } from '@/components/layout'
import { Card, Avatar, Button, Modal } from '@/components/ui'
import { LanguageSwitcher } from '@/components/shared'
import { useApp } from '@/context/AppContext'
import { Settings, FileText, Bell, HelpCircle, LogOut, ChevronRight, Activity, ShieldCheck, File, Download, QrCode, Share2, WifiOff, AlertCircle } from 'lucide-react'

const Profile = () => {
  const { activeProfile, logout } = useApp()
  const [showMedicalRecords, setShowMedicalRecords] = useState(false)
  const [showABHA, setShowABHA] = useState(false)
  const [dataSaver, setDataSaver] = useState(false)
  const [abhaId, setAbhaId] = useState(activeProfile?.abhaId || 'Unlinked')
  const [abhaStep, setAbhaStep] = useState(activeProfile?.abhaId && activeProfile.abhaId !== 'Unlinked' ? 'linked' : 'link')

  // Sync state when profile changes
  useEffect(() => {
    setAbhaId(activeProfile?.abhaId || 'Unlinked')
    setAbhaStep(activeProfile?.abhaId && activeProfile.abhaId !== 'Unlinked' ? 'linked' : 'link')
  }, [activeProfile?.id, activeProfile?.abhaId])

  const SETTING_GROUPS = [
    {
      title: 'Health Profile',
      items: [
        { id: 'records', label: 'Medical Records', icon: FileText },
        { id: 'vitals', label: 'Vitals & Stats', icon: Activity },
        { id: 'abha', label: 'ABHA Health ID', icon: ShieldCheck },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'datasaver', label: 'Data Saver (2G/3G Mode)', icon: WifiOff, component: (
            <div 
              onClick={(e) => { e.stopPropagation(); setDataSaver(!dataSaver) }}
              className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${dataSaver ? 'bg-success-500' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${dataSaver ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          ) 
        },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'language', label: 'Language', icon: Settings, component: <LanguageSwitcher variant="minimal" /> },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ]
    }
  ]

  const handleItemClick = (id) => {
    if (id === 'records') {
      setShowMedicalRecords(true)
    } else if (id === 'abha') {
      setShowABHA(true)
    }
  }

  return (
    <>
      <TopBar title="My Profile" showBack={false} />
      <PageWrapper className="pt-14 pb-28">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 mt-4 px-4">
          
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar src={activeProfile?.avatar} name={activeProfile?.name} size="xl" className="ring-4 ring-white shadow-sm" />
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-[var(--color-text)]">{activeProfile?.name}</h2>
              <p className="text-sm text-[var(--color-text-soft)] mt-0.5">{activeProfile?.phone}</p>
              <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${abhaId !== 'Unlinked' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                {abhaId !== 'Unlinked' ? <ShieldCheck size={12} /> : <AlertCircle size={12} />}
                {abhaId !== 'Unlinked' ? 'ABHA Linked' : 'Link ABHA'}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Age', value: `${activeProfile?.age || '--'} yrs` },
              { label: 'Blood', value: activeProfile?.bloodGroup || '--' },
              { label: 'Gender', value: activeProfile?.gender || '--' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--color-surface-2)] p-3 rounded-2xl text-center border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-muted)]">{stat.label}</p>
                <p className="text-sm font-bold text-[var(--color-text)] mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Settings Lists */}
          <div className="flex flex-col gap-6">
            {SETTING_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider mb-2 px-1">
                  {group.title}
                </h3>
                <Card className="p-0 overflow-hidden">
                  <div className="flex flex-col divide-y divide-[var(--color-border)]">
                    {group.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`flex items-center gap-3 p-4 hover:bg-[var(--color-surface-2)] transition-colors text-left ${item.id !== 'language' ? 'cursor-pointer' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                          <item.icon size={16} className="text-brand-600" />
                        </div>
                        <span className="flex-1 text-sm font-semibold text-[var(--color-text)]">{item.label}</span>
                        {item.component ? (
                          item.component
                        ) : (
                          <>
                            {item.value && (
                              <span className="text-xs font-medium text-[var(--color-muted)] mr-1">{item.value}</span>
                            )}
                            <ChevronRight size={16} className="text-[var(--color-muted)]" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              fullWidth 
              size="lg" 
              onClick={logout}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut size={18} className="mr-2" />
              Log Out
            </Button>
            <p className="text-center text-[10px] text-[var(--color-muted)] mt-4">
              Sehat Saathi v1.0.0 (Prototype)
            </p>
          </div>

        </div>
      </PageWrapper>

      {/* Medical Records Modal */}
      <Modal 
        isOpen={showMedicalRecords} 
        onClose={() => setShowMedicalRecords(false)} 
        title="Medical Records" 
        size="md"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[var(--color-text-soft)] mb-2">
            Your recent health documents and prescriptions.
          </p>
          {[
            { name: 'Blood Test Report', date: 'Aug 04, 2026', size: '1.2 MB' },
            { name: 'Dr. Sharma Prescription', date: 'Jul 22, 2026', size: '450 KB' },
            { name: 'X-Ray Scan Results', date: 'Jun 15, 2026', size: '3.4 MB' },
          ].map((record, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] hover:border-brand-300 hover:bg-brand-50/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <File size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text)]">{record.name}</p>
                  <p className="text-xs font-medium text-[var(--color-muted)]">{record.date} • {record.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-[#25D366] hover:bg-green-50 rounded-full transition-colors" title="Share via WhatsApp">
                  <Share2 size={16} />
                </button>
                <button className="p-2 text-[var(--color-muted)] hover:text-brand-600 rounded-full transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
          <Button variant="primary" className="mt-4" fullWidth onClick={() => setShowMedicalRecords(false)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* ABHA ID Modal */}
      <Modal 
        isOpen={showABHA} 
        onClose={() => setShowABHA(false)} 
        title="ABHA Health ID" 
        size="sm"
      >
        <div className="flex flex-col items-center gap-4 text-center w-full">
          {abhaStep === 'linked' ? (
            <>
              <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl animate-pulse"></div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-green-700 font-bold text-lg tracking-tight">ABHA</span>
                  <ShieldCheck size={24} className="text-green-600" />
                </div>
                
                <div className="text-left relative z-10">
                  <p className="text-xs text-green-700/70 font-semibold mb-1">Health ID Number</p>
                  <p className="text-xl font-display font-bold text-green-900 tracking-wider">
                    {abhaId}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center justify-between relative z-10">
                  <div className="text-left">
                    <p className="text-xs text-green-700/70 font-semibold mb-0.5">Name</p>
                    <p className="text-sm font-bold text-green-900">{activeProfile?.name}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-green-400 rounded-lg blur opacity-30 animate-pulse"></div>
                    <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-sm border border-green-200 flex items-center justify-center relative z-10">
                      <QrCode size={32} className="text-green-900" />
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] text-[var(--color-text-soft)] px-4">
                Show this QR code at any ABHA-enabled clinic, hospital, or pharmacy to securely share your health records.
              </p>
              
              <div className="flex gap-2 w-full mt-2">
                <Button variant="outline" fullWidth onClick={() => { setAbhaId('Unlinked'); setAbhaStep('link'); }} className="text-red-600 border-red-200 hover:bg-red-50">
                  Unlink
                </Button>
                <Button variant="primary" fullWidth onClick={() => setShowABHA(false)}>
                  Done
                </Button>
              </div>
            </>
          ) : abhaStep === 'link' ? (
            <>
              <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-2 mt-4">
                <ShieldCheck size={32} className="text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">Link ABHA ID</h3>
              <p className="text-xs text-[var(--color-muted)] mb-4 px-4 leading-relaxed">Enter your Aadhaar number or phone number to link your Ayushman Bharat Health Account.</p>
              
              <div className="w-full text-left">
                <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block px-1">Aadhaar / Mobile Number</label>
                <input type="text" placeholder="Enter 12-digit Aadhaar" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold outline-none focus:border-brand-500 mb-4 transition-colors" />
              </div>

              <Button variant="primary" fullWidth onClick={() => setAbhaStep('otp')} className="mt-2">
                Request OTP
              </Button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-2 mt-4">
                <ShieldCheck size={32} className="text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">Enter OTP</h3>
              <p className="text-xs text-[var(--color-muted)] mb-4">An OTP has been sent to your registered mobile number.</p>
              
              <div className="w-full text-left">
                <label className="text-xs font-bold text-[var(--color-muted)] mb-1 block px-1">One Time Password</label>
                <input type="text" placeholder="• • • • • •" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-bold tracking-[0.5em] text-center outline-none focus:border-brand-500 mb-4 transition-colors" />
              </div>

              <Button variant="primary" fullWidth onClick={() => { setAbhaId('12-8765-4321-9999'); setAbhaStep('linked'); }} className="mt-2">
                Verify & Link
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default Profile
