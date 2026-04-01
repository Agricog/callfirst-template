// ============================================================
// CallFirst Client Template — Area Page
// Dynamic area page rendered from CLIENT config
// ============================================================

import { useParams, Link, Navigate } from 'react-router-dom'
import { Phone, ChevronRight, ArrowLeft, MapPin } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { getAreaPageStructuredData } from '@/utils/seo'
import { trackCta, trackPhoneCall, trackAreaView } from '@/utils/analytics'
import { useEffect } from 'react'
import SeoHead from '@/components/common/SeoHead'
import TrustStrip from '@/components/common/TrustStrip'
import ServiceCard from '@/components/common/ServiceCard'
import CtaSection from '@/components/common/CtaSection'
import AiChatIntake from '@/components/AiChatIntake'

export default function AreaPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const phoneClean = CLIENT.phone.replace(/\s/g, '')

  const area = CLIENT.areasServed.find((a) => a.slug === slug)

  useEffect(() => {
    if (area) trackAreaView(area.name)
  }, [area])

  if (!area) return <Navigate to="/" replace />

  const { page, data } = getAreaPageStructuredData(area.name, area.slug)
  const nearbyAreas = CLIENT.areasServed.filter((a) => a.slug !== slug).slice(0, 6)

  return (
    <>
      <SeoHead page={page} structuredData={data} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-600 no-underline text-slate-400">Home</Link>
            <span>/</span>
            <Link to="/areas" className="hover:text-slate-600 no-underline text-slate-400">Areas</Link>
            <span>/</span>
            <span className="text-slate-600">{area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="flex-1">
              <Link
                to="/areas"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 no-underline mb-6"
              >
                <ArrowLeft size={14} />
                All areas
              </Link>

              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-dark)' }}>
                <MapPin size={13} />
                {area.distanceFromBase + ' from ' + CLIENT.area}
              </div>

              <h1 className="font-heading text-[clamp(28px,5vw,44px)] leading-[1.1] text-slate-800 mb-4">
                {'Roofer in '}
                <span style={{ color: 'var(--color-brand)' }}>{area.name}</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                {area.description + ' ' + CLIENT.businessName + ' provides the full range of roofing services in ' + area.name + ' including roof repairs, reroofs, flat roofing, chimney work, and guttering. All work is guaranteed and covered by our \u00A3' + CLIENT.insuranceAmount + ' public liability insurance.'}
              </p>

              <p className="text-[15px] text-slate-500 leading-relaxed mb-8">
                {'As a ' + CLIENT.area + '-based company, we know ' + area.name + ' well and can respond quickly to both planned work and emergencies. Our pricing for ' + area.name + ' is the same as our standard ' + CLIENT.area + ' rates \u2014 no extra travel charges.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  className="btn-primary"
                  onClick={() => {
                    trackCta('get_quote', 'area_page')
                    document.querySelector('.ai-chat-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                >
                  {'Get a Quote in ' + area.name}
                  <ChevronRight size={18} />
                </button>
                <a href={'tel:' + phoneClean} className="btn-secondary" onClick={() => trackPhoneCall('area_page')}>
                  <Phone size={17} />
                  {CLIENT.phone}
                </a>
              </div>
            </div>

            <div className="flex-1 flex justify-center w-full max-w-[440px] ai-chat-container lg:sticky lg:top-24">
              <AiChatIntake />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Services in this area */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl text-slate-800 text-center mb-8">
            {'Roofing services in ' + area.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLIENT.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 px-4 section-warm">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl text-slate-800 mb-6">
            {'Other areas near ' + area.name}
          </h2>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {nearbyAreas.map((a) => (
              <Link
                key={a.slug}
                to={'/areas/' + a.slug}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-medium no-underline hover:border-amber-300 hover:text-amber-700 transition-colors"
              >
                <MapPin size={13} />
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection heading={'Need a roofer in ' + area.name + '?'} />
    </>
  )
}
