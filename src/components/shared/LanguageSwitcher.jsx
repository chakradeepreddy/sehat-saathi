import { Globe } from 'lucide-react'
import { useApp } from '@/context/AppContext'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' }
]

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { language, setLanguage } = useApp()

  if (variant === 'minimal') {
    return (
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent border-none outline-none text-sm font-semibold text-[var(--color-muted)] cursor-pointer text-right appearance-none pr-4 relative"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', paddingRight: '20px' }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
        <Globe size={18} className="text-brand-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent border-none outline-none text-sm font-semibold text-brand-700 w-full cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Default small dropdown for headers
  return (
    <div className="relative flex items-center bg-white/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/20">
      <Globe size={14} className="text-white mr-1" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer appearance-none pr-1"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
