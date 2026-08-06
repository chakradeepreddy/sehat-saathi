// src/components/shared/HealthTipCard.jsx
// ─────────────────────────────────────────────────────────────
// Health tip card for Dashboard horizontal scroll.
// Localised tips relevant to Nabha / rural Punjab context.
// ─────────────────────────────────────────────────────────────

import { Leaf, Droplets, Heart, Activity, Shield } from 'lucide-react'
import { Card } from '@/components/ui'

// Maps icon name string from JSON to actual Lucide component
const ICON_MAP = {
  Leaf,
  Droplets,
  Heart,
  Activity,
  Shield,
}

const COLOR_MAP = {
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  title: 'text-green-800',  badge: 'bg-green-100 text-green-700' },
  blue:   { bg: 'bg-brand-50',  icon: 'text-brand-600',  title: 'text-brand-800',  badge: 'bg-brand-100 text-brand-700' },
  pink:   { bg: 'bg-pink-50',   icon: 'text-pink-600',   title: 'text-pink-800',   badge: 'bg-pink-100 text-pink-700' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', title: 'text-orange-800', badge: 'bg-orange-100 text-orange-700' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', title: 'text-purple-800', badge: 'bg-purple-100 text-purple-700' },
}

/**
 * @param {object} props
 * @param {object} props.tip - Health tip data from healthTips.json
 */
const HealthTipCard = ({ tip }) => {
  const Icon = ICON_MAP[tip.icon] || Leaf
  const colors = COLOR_MAP[tip.color] || COLOR_MAP.blue

  return (
    <Card
      className={`p-4 w-64 flex-shrink-0 ${colors.bg} border-0`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${colors.bg} border border-current/10 flex items-center justify-center shrink-0`}>
          <Icon size={20} className={colors.icon} />
        </div>
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.badge} px-2 py-0.5 rounded-md`}>
            {tip.category}
          </span>
          <h4 className={`text-sm font-semibold ${colors.title} mt-1.5 leading-snug`}>
            {tip.title}
          </h4>
        </div>
      </div>
      <p className={`text-xs leading-relaxed mt-3 ${colors.icon} opacity-80`}>
        {tip.body}
      </p>
    </Card>
  )
}

export default HealthTipCard
