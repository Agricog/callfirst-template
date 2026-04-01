// ============================================================
// CallFirst Client Template — Trust Strip
// Horizontal bar of key trust metrics shown below the hero
// ============================================================

import { ShieldCheck, Clock, Star, Award } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'

const TRUST_ITEMS = [
  {
    icon: Star,
    value: CLIENT.googleReviewRating + '/5',
    label: CLIENT.googleReviewCount + ' Google Reviews',
  },
  {
    icon: ShieldCheck,
    value: '\u00A3' + CLIENT.insuranceAmount,
    label: 'Public Liability',
  },
  {
    icon: Award,
    value: String(new Date().getFullYear() - CLIENT.yearEstablished) + ' Years',
    label: 'Established ' + CLIENT.yearEstablished,
  },
  {
    icon: Clock,
    value: 'Same Day',
    label: 'Response Guaranteed',
  },
]

export default function TrustStrip(): JSX.Element {
  return (
    <div className="bg-white border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-brand-50)' }}
              >
                <item.icon size={20} style={{ color: 'var(--color-brand)' }} />
              </div>
              <div>
                <div className="font-semibold text-sm text-slate-800 leading-tight">
                  {item.value}
                </div>
                <div className="text-xs text-slate-500 leading-tight">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
