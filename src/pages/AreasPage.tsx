// ============================================================
// CallFirst Client Template — Areas Listing Page
// ============================================================

import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { buildStructuredData, getBreadcrumbSchema } from '@/utils/seo'
import SeoHead from '@/components/common/SeoHead'
import CtaSection from '@/components/common/CtaSection'
import type { SeoPageData } from '@/types'

const BASE_URL = 'https://' + CLIENT.domain

export default function AreasPage(): JSX.Element {
  const page: SeoPageData = {
    title: 'Areas We Cover | ' + CLIENT.businessName + ' | Roofers ' + CLIENT.area,
    description: CLIENT.businessName + ' provides roofing services across ' + CLIENT.area + ' and ' + CLIENT.region + '. ' + CLIENT.areasServed.map((a) => a.name).join(', ') + '.',
    canonical: BASE_URL + '/areas',
    ogImage: BASE_URL + '/og-image.jpg',
    type: 'website',
    keywords: ['roofer ' + CLIENT.area.toLowerCase(), 'roofing ' + CLIENT.region.toLowerCase()],
  }

  const structuredData = buildStructuredData(page, [
    getBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Areas', url: page.canonical },
    ]),
  ])

  return (
    <>
      <SeoHead page={page} structuredData={structuredData} />

      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-600 no-underline text-slate-400">Home</Link>
            <span>/</span>
            <span className="text-slate-600">Areas</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-[clamp(28px,5vw,44px)] leading-[1.1] text-slate-800 mb-4">
              {'Areas we cover across '}
              <span style={{ color: 'var(--color-brand)' }}>{CLIENT.region}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {CLIENT.businessName + ' is based in ' + CLIENT.area + ' and provides roofing services across the whole of ' + CLIENT.region + '. Click any area for local pricing and availability.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLIENT.areasServed.map((area) => (
              <Link
                key={area.slug}
                to={'/areas/' + area.slug}
                className="card p-5 flex items-start gap-4 no-underline group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-brand-50)' }}
                >
                  <MapPin size={18} style={{ color: 'var(--color-brand)' }} />
                </div>
                <div>
                  <h2 className="font-heading text-base text-slate-800 mb-0.5 group-hover:text-amber-700 transition-colors">
                    {'Roofer in ' + area.name}
                  </h2>
                  <p className="text-sm text-slate-400 mb-1">{area.distanceFromBase + ' from ' + CLIENT.area}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
