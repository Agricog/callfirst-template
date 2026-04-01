// ============================================================
// CallFirst Client Template — Service Card
// ============================================================

import { Link } from 'react-router-dom'
import { ChevronRight, Wrench, Home, Layers, Flame, Droplets } from 'lucide-react'
import type { ServiceConfig } from '@/types'

const ICON_MAP: Record<string, typeof Wrench> = {
  wrench: Wrench,
  home: Home,
  layers: Layers,
  flame: Flame,
  droplets: Droplets,
}

interface ServiceCardProps {
  service: ServiceConfig
}

export default function ServiceCard({ service }: ServiceCardProps): JSX.Element {
  const Icon = ICON_MAP[service.icon] || Wrench

  return (
    <Link
      to={'/' + service.slug}
      className="card p-6 flex flex-col gap-4 no-underline group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'var(--color-brand-50)',
        }}
      >
        <Icon size={22} style={{ color: 'var(--color-brand)' }} />
      </div>

      <div>
        <h3 className="font-heading text-lg text-slate-800 mb-1.5">
          {service.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          {service.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-brand)' }}>
            {'From \u00A3' + service.priceFrom}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-slate-600 transition-colors">
            Learn more
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
