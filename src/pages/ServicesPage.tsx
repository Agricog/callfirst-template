// ============================================================
// CallFirst Client Template — Services Listing Page
// ============================================================

import { Link } from 'react-router-dom'
import { CLIENT } from '@/data/clientConfig'
import { buildStructuredData, getBreadcrumbSchema } from '@/utils/seo'
import SeoHead from '@/components/common/SeoHead'
import ServiceCard from '@/components/common/ServiceCard'
import CtaSection from '@/components/common/CtaSection'
import type { SeoPageData } from '@/types'

const BASE_URL = 'https://' + CLIENT.domain

export default function ServicesPage(): JSX.Element {
  const page: SeoPageData = {
    title: 'Roofing Services ' + CLIENT.area + ' | ' + CLIENT.businessName,
    description: 'Full range of roofing services in ' + CLIENT.area + ': roof repairs, reroofs, flat roofing, chimney work, and guttering. Free quotes. All work guaranteed.',
    canonical: BASE_URL + '/services',
    ogImage: BASE_URL + '/og-image.jpg',
    type: 'website',
    keywords: ['roofing services ' + CLIENT.area.toLowerCase()],
  }

  const structuredData = buildStructuredData(page, [
    getBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: page.canonical },
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
            <span className="text-slate-600">Services</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-[clamp(28px,5vw,44px)] leading-[1.1] text-slate-800 mb-4">
              {'Roofing services in '}
              <span style={{ color: 'var(--color-brand)' }}>{CLIENT.area}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {'From emergency leak repairs to full reroofs, ' + CLIENT.businessName + ' handles every aspect of domestic and commercial roofing across ' + CLIENT.area + ' and ' + CLIENT.region + '.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLIENT.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
