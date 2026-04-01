// ============================================================
// CallFirst Client Template — Service Page
// Dynamic service page rendered from CLIENT config
// ============================================================

import { useParams, Link, Navigate } from 'react-router-dom'
import { Phone, ChevronRight, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { getServicePageStructuredData } from '@/utils/seo'
import { trackCta, trackPhoneCall, trackServiceView } from '@/utils/analytics'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect } from 'react'
import SeoHead from '@/components/common/SeoHead'
import TrustStrip from '@/components/common/TrustStrip'
import FaqSection from '@/components/common/FaqSection'
import CtaSection from '@/components/common/CtaSection'
import AiChatIntake from '@/components/AiChatIntake'

export default function ServicePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const { setSectionRef, revealClass } = useScrollReveal()
  const phoneClean = CLIENT.phone.replace(/\s/g, '')

  const service = CLIENT.services.find((s) => s.slug === slug)

  useEffect(() => {
    if (service) trackServiceView(service.name)
  }, [service])

  if (!service) return <Navigate to="/" replace />

  const { page, data } = getServicePageStructuredData(service)
  const relatedServices = CLIENT.services.filter((s) => s.slug !== slug).slice(0, 3)

  // Generate service-specific FAQs
  const serviceFaqs = [
    {
      question: 'How much does ' + service.name.toLowerCase() + ' cost in ' + CLIENT.area + '?',
      answer: service.name + ' in ' + CLIENT.area + ' typically costs between \u00A3' + service.priceFrom + ' and \u00A3' + service.priceTo + '. The final price depends on the size of the job, materials required, and access to the roof. We provide free quotes so you know the exact cost before we start.',
    },
    {
      question: 'How quickly can you do ' + service.name.toLowerCase() + '?',
      answer: 'For emergency work we can often attend the same day. For planned work, we typically quote within 48 hours and schedule within a week, depending on our current workload and the weather.',
    },
    {
      question: 'Do you guarantee your ' + service.name.toLowerCase() + ' work?',
      answer: 'Yes. All ' + service.name.toLowerCase() + ' work comes with a written guarantee covering both materials and workmanship. We also carry \u00A3' + CLIENT.insuranceAmount + ' public liability insurance.',
    },
  ]

  return (
    <>
      <SeoHead page={page} structuredData={data} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-600 no-underline text-slate-400">Home</Link>
            <span>/</span>
            <span className="text-slate-600">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left: Content */}
            <div className="flex-1">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 no-underline mb-6"
              >
                <ArrowLeft size={14} />
                All services
              </Link>

              <h1 className="font-heading text-[clamp(28px,5vw,44px)] leading-[1.1] text-slate-800 mb-4">
                {service.name + ' in '}
                <span style={{ color: 'var(--color-brand)' }}>{CLIENT.area}</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                {service.longDescription}
              </p>

              {/* Price indicator */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8"
                style={{
                  background: 'var(--color-brand-50)',
                  border: '1px solid rgba(217, 119, 6, 0.15)',
                }}
              >
                <span className="text-sm text-slate-600">Typical cost:</span>
                <span className="font-heading text-lg" style={{ color: 'var(--color-brand-dark)' }}>
                  {'\u00A3' + service.priceFrom + ' \u2013 \u00A3' + service.priceTo.toLocaleString()}
                </span>
              </div>

              {/* Features list */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--color-success)' }}
                    />
                    <span className="text-[15px] text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  className="btn-primary"
                  onClick={() => {
                    trackCta('get_quote', 'service_page')
                    document.querySelector('.ai-chat-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                >
                  {'Get a ' + service.name + ' Quote'}
                  <ChevronRight size={18} />
                </button>
                <a
                  href={'tel:' + phoneClean}
                  className="btn-secondary"
                  onClick={() => trackPhoneCall('service_page')}
                >
                  <Phone size={17} />
                  {CLIENT.phone}
                </a>
              </div>
            </div>

            {/* Right: AI Chat */}
            <div className="flex-1 flex justify-center w-full max-w-[440px] ai-chat-container lg:sticky lg:top-24">
              <AiChatIntake />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Service FAQ */}
      <section
        ref={setSectionRef('service-faq')}
        className={'py-16 px-4 section-warm ' + revealClass('service-faq')}
      >
        <FaqSection
          title={service.name + ' \u2014 Common Questions'}
          faqs={serviceFaqs}
        />
      </section>

      {/* Related Services */}
      <section
        ref={setSectionRef('related')}
        className={'py-16 px-4 ' + revealClass('related')}
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl text-slate-800 text-center mb-8">
            Other services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                to={'/' + s.slug}
                className="card p-5 text-center no-underline group"
              >
                <h3 className="font-heading text-base text-slate-800 mb-1">{s.name}</h3>
                <p className="text-xs text-slate-400 mb-2">{'From \u00A3' + s.priceFrom}</p>
                <span className="text-xs flex items-center justify-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--color-brand)' }}>
                  View details <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading={'Need ' + service.name.toLowerCase() + ' in ' + CLIENT.area + '?'}
      />
    </>
  )
}
