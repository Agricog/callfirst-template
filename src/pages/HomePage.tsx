// ============================================================
// CallFirst Client Template — Homepage
// Conversion flow: Hero+Chat > Trust > Services > HowItWorks >
// Pricing > Areas > FAQ > CTA > SEO Content
// ============================================================

import { Link } from 'react-router-dom'
import {
  Phone, MapPin, ChevronRight, Star, ShieldCheck,
  CheckCircle, Clock,
} from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { getHomepageStructuredData } from '@/utils/seo'
import { trackCta, trackPhoneCall } from '@/utils/analytics'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import SeoHead from '@/components/common/SeoHead'
import TrustStrip from '@/components/common/TrustStrip'
import ServiceCard from '@/components/common/ServiceCard'
import FaqSection from '@/components/common/FaqSection'
import CtaSection from '@/components/common/CtaSection'
import AiChatIntake from '@/components/AiChatIntake'

export default function HomePage(): JSX.Element {
  const { page, data } = getHomepageStructuredData()
  const { setSectionRef, revealClass } = useScrollReveal()
  const phoneClean = CLIENT.phone.replace(/\s/g, '')
  const yearsInBusiness = new Date().getFullYear() - CLIENT.yearEstablished

  return (
    <>
      <SeoHead page={page} structuredData={data} />

      {/* ── HERO + AI CHAT ─────────────────────── */}
      <section
        id="quote"
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-slate-50) 0%, white 100%)',
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-slate-600) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5"
                style={{
                  background: 'var(--color-brand-50)',
                  color: 'var(--color-brand-dark)',
                }}
              >
                <MapPin size={14} />
                {'Serving ' + CLIENT.area + ' & ' + CLIENT.region}
              </div>

              <h1 className="font-heading text-[clamp(32px,5.5vw,52px)] leading-[1.08] text-slate-800 mb-5">
                {'Trusted roofers in '}
                <span style={{ color: 'var(--color-brand)' }}>{CLIENT.area}</span>
                {' for over ' + yearsInBusiness + ' years'}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {'Tell us what you need \u2014 our AI assistant will scope your job in 30 seconds. ' + CLIENT.ownerName + ' calls you back with a quote at a time that suits you. No obligation, no call-out fee.'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <button
                  className="btn-primary !py-3.5 !px-7"
                  onClick={() => {
                    trackCta('get_quote', 'hero')
                   window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Get a Free Quote
                  <ChevronRight size={18} />
                </button>
                <a
                  href={'tel:' + phoneClean}
                  className="btn-secondary !py-3.5 !px-7"
                  onClick={() => trackPhoneCall('hero')}
                >
                  <Phone size={17} />
                  {CLIENT.phone}
                </a>
              </div>

              {/* Mini trust signals */}
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                {[
                  { icon: Star, text: CLIENT.googleReviewRating + '/5 (' + CLIENT.googleReviewCount + ' reviews)' },
                  { icon: ShieldCheck, text: '\u00A3' + CLIENT.insuranceAmount + ' insured' },
                  { icon: CheckCircle, text: 'All work guaranteed' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <item.icon size={15} style={{ color: 'var(--color-success)' }} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Chat */}
            <div className="flex-1 flex justify-center w-full max-w-[440px] ai-chat-container">
              <AiChatIntake />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────── */}
      <TrustStrip />

      {/* ── SERVICES ───────────────────────────── */}
      <section
        ref={setSectionRef('services')}
        className={'py-16 md:py-20 px-4 ' + revealClass('services')}
        id="services"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--color-brand)' }}
            >
              Our Services
            </p>
            <h2 className="font-heading text-2xl md:text-[32px] text-slate-800 mb-3">
              {'Roofing services across ' + CLIENT.area}
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              {'From emergency leak repairs to full reroofs, we handle every aspect of domestic and commercial roofing in ' + CLIENT.region + '.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLIENT.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────── */}
      <section
        ref={setSectionRef('how-it-works')}
        className={'py-16 md:py-20 px-4 section-warm ' + revealClass('how-it-works')}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--color-brand)' }}
            >
              How It Works
            </p>
            <h2 className="font-heading text-2xl md:text-[32px] text-slate-800">
              Three steps to your quote
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tell us about your roof',
                description: 'Chat with our AI assistant for 30 seconds. It asks three simple questions about your job \u2014 no forms, no photo uploads.',
              },
              {
                step: '2',
                title: 'Get an instant estimate',
                description: 'See a price range for your job straight away based on current ' + CLIENT.area + ' pricing, so you know what to expect.',
              },
              {
                step: '3',
                title: CLIENT.ownerName + ' calls you back',
                description: 'Pick a time that suits you. ' + CLIENT.ownerName + ' calls with a detailed quote. No chasing, no missed calls \u2014 just a confirmed callback.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading text-xl mx-auto mb-4"
                  style={{
                    background: 'var(--color-brand)',
                    color: 'white',
                  }}
                >
                  {item.step}
                </div>
                <h3 className="font-heading text-lg text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING GUIDE ──────────────────────── */}
      <section
        ref={setSectionRef('pricing')}
        className={'py-16 md:py-20 px-4 ' + revealClass('pricing')}
        id="pricing"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--color-brand)' }}
            >
              Pricing Guide
            </p>
            <h2 className="font-heading text-2xl md:text-[32px] text-slate-800 mb-3">
              {'Roofing costs in ' + CLIENT.area}
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Indicative pricing based on typical jobs. Your quote depends on job scope, materials, and access. All quotes are free and include a full inspection.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLIENT.estimateRange.map((range) => (
              <div key={range.size} className="card p-5 text-center">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
                  {range.size}
                </div>
                <div className="font-heading text-xl text-slate-800">
                  {'\u00A3' + range.low.toLocaleString() + '\u2013\u00A3' + range.high.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">typical range</div>
              </div>
            ))}
          </div>

          {CLIENT.discountActive && (
            <div
              className="mt-6 p-4 rounded-xl text-center text-sm"
              style={{
                background: 'var(--color-brand-50)',
                border: '1px solid rgba(217, 119, 6, 0.15)',
                color: 'var(--color-brand-dark)',
              }}
            >
              {'\u26A1 ' + CLIENT.discountPercent + '% off all quotes this week \u2014 '}
              <button
                className="font-semibold underline bg-transparent border-none cursor-pointer"
                style={{ color: 'var(--color-brand-dark)' }}
                onClick={() => {
                  trackCta('discount_cta', 'pricing')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                get your free quote now
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────── */}
      <section
        ref={setSectionRef('why-us')}
        className={'py-16 md:py-20 px-4 section-warm ' + revealClass('why-us')}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--color-brand)' }}
            >
              Why Choose Us
            </p>
            <h2 className="font-heading text-2xl md:text-[32px] text-slate-800">
              {'Why ' + CLIENT.area + ' trusts ' + CLIENT.businessName}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CLIENT.trustSignals.map((signal) => {
              const iconMap: Record<string, typeof ShieldCheck> = {
                'shield-check': ShieldCheck,
                clock: Clock,
                'map-pin': MapPin,
                'badge-check': CheckCircle,
              }
              const Icon = iconMap[signal.icon] || CheckCircle

              return (
                <div key={signal.title} className="card p-6 flex gap-4 items-start">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-brand-50)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-brand)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{signal.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{signal.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AREAS SERVED ───────────────────────── */}
      <section
        ref={setSectionRef('areas')}
        className={'py-16 md:py-20 px-4 ' + revealClass('areas')}
        id="areas"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--color-brand)' }}
            >
              Areas We Cover
            </p>
            <h2 className="font-heading text-2xl md:text-[32px] text-slate-800 mb-3">
              {'Roofers across ' + CLIENT.area + ' and ' + CLIENT.region}
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              {'We provide roofing services across ' + CLIENT.area + ' and the surrounding ' + CLIENT.region + ' area. Click an area to see local pricing and availability.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {CLIENT.areasServed.map((area) => (
              <Link
                key={area.slug}
                to={'/areas/' + area.slug}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-medium no-underline hover:border-amber-300 hover:text-amber-700 transition-colors"
              >
                <MapPin size={13} />
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section
        ref={setSectionRef('faq')}
        className={'py-16 md:py-20 px-4 section-warm ' + revealClass('faq')}
        id="faq"
      >
        <FaqSection />
      </section>

      {/* ── BOTTOM CTA ─────────────────────────── */}
      <CtaSection />

      {/* ── SEO CONTENT ────────────────────────── */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <article className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl text-slate-800 mb-6">
            {'Roofing Services in ' + CLIENT.area + ' \u2014 ' + CLIENT.businessName}
          </h2>

          <div className="text-[15px] text-slate-500 leading-[1.85] space-y-5">
            <p>
              {CLIENT.businessName + ' is an established roofing company serving ' + CLIENT.area + ' and the wider ' + CLIENT.region + ' area. With over ' + yearsInBusiness + ' years of experience, we provide a full range of domestic and commercial roofing services including roof repairs, complete reroofs, flat roofing, chimney work, and guttering. Every job comes with a written guarantee and is covered by our \u00A3' + CLIENT.insuranceAmount + ' public liability insurance.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              {'Why Choose a Local Roofer in ' + CLIENT.area + '?'}
            </h3>
            <p>
              {'Choosing a local roofer matters. A roofer based in ' + CLIENT.area + ' can respond faster to emergencies, has experience with the specific property types and weather conditions in ' + CLIENT.region + ', and is invested in their local reputation. We have worked on properties across every part of ' + CLIENT.area + ' \u2014 from period homes in the city centre to modern estates on the outskirts \u2014 and we understand the unique challenges each property type presents.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              {'How Much Does Roofing Cost in ' + CLIENT.area + '?'}
            </h3>
            <p>
              {'Roofing costs in ' + CLIENT.area + ' depend on the type of work required. A straightforward repair for a leak or a few slipped tiles typically costs between \u00A3' + CLIENT.estimateRange[0].low + ' and \u00A3' + CLIENT.estimateRange[0].high + '. Chimney repointing and reflashing ranges from \u00A3' + CLIENT.estimateRange[1].low + ' to \u00A3' + CLIENT.estimateRange[1].high + '. A full reroof on a standard semi-detached home is typically \u00A3' + CLIENT.estimateRange[3].low.toLocaleString() + ' to \u00A3' + CLIENT.estimateRange[3].high.toLocaleString() + ', depending on the size of the roof, the pitch, and the materials chosen. We provide free, no-obligation quotes on every job so you know the exact cost before any work starts.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              Emergency Roof Repairs
            </h3>
            <p>
              {'When you have an active leak or storm damage, you need a roofer who can attend quickly. We offer same-day emergency attendance across ' + CLIENT.area + ' and ' + CLIENT.region + '. Our vans carry emergency tarpaulins and common repair materials so we can make your property watertight on the first visit. Emergency repairs are charged at our standard rates \u2014 no inflated call-out fees.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              Our Roofing Process
            </h3>
            <p>
              Every job follows the same clear process. First, you tell us what you need \u2014 either through our online quote tool or by phone. We then arrange a convenient time to visit your property and carry out a full roof inspection. We provide a detailed written quote with no hidden costs. Once approved, we schedule the work at a time that suits you, complete it to the highest standard, and issue your guarantee certificate. We leave the site clean and tidy and follow up to make sure you are completely satisfied.
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              Types of Roofing We Work With
            </h3>
            <p>
              {'We work with all common roofing types found in ' + CLIENT.region + ' including pitched roofs with concrete or clay tiles, natural slate roofs, flat roofs with felt, GRP fibreglass, or EPDM rubber, and lead work around chimneys, valleys, and dormers. Whether your property is a Victorian terrace, a 1930s semi, a modern new build, or a commercial unit, we have the experience and materials to handle the job.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              {'Areas We Cover Near ' + CLIENT.area}
            </h3>
            <p>
              {'We provide roofing services across ' + CLIENT.area + ' and the surrounding areas of ' + CLIENT.region + ', including ' + CLIENT.areasServed.map((a) => a.name).join(', ') + '. If you are unsure whether we cover your location, contact us \u2014 we probably do.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              Our Guarantee
            </h3>
            <p>
              {'We stand behind every job we do. Repairs come with a 12-month written guarantee. Full reroofs are guaranteed for 20 years on materials and workmanship. Flat roofs are guaranteed for the lifetime of the membrane system \u2014 typically 25 years or more. We also carry \u00A3' + CLIENT.insuranceAmount + ' public liability insurance on every job, so you are fully protected from day one.'}
            </p>

            <h3 className="font-heading text-lg text-slate-700 !mt-8 !mb-3">
              Get Your Free Quote Today
            </h3>
            <p>
              {'Use our quick quote tool at the top of this page to tell us about your roofing job. It takes less than 30 seconds and ' + CLIENT.ownerName + ' will call you back at a time that suits you with a detailed quote. Alternatively, call us directly on ' + CLIENT.phone + '. No obligation, no pressure \u2014 just a straightforward quote from a local roofer who knows ' + CLIENT.area + '.'}
            </p>
          </div>
        </article>
      </section>
    </>
  )
}
