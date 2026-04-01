// ============================================================
// CallFirst Client Template — About Page
// E-E-A-T signals, insurance, guarantees, story
// ============================================================

import { ShieldCheck, Award, Clock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CLIENT } from '@/data/clientConfig'
import { buildStructuredData, getBreadcrumbSchema } from '@/utils/seo'
import SeoHead from '@/components/common/SeoHead'
import CtaSection from '@/components/common/CtaSection'
import type { SeoPageData } from '@/types'

const BASE_URL = 'https://' + CLIENT.domain

export default function AboutPage(): JSX.Element {
  const yearsInBusiness = new Date().getFullYear() - CLIENT.yearEstablished

  const page: SeoPageData = {
    title: 'About ' + CLIENT.businessName + ' | Trusted Roofers in ' + CLIENT.area,
    description: CLIENT.businessName + ' has been providing roofing services across ' + CLIENT.area + ' for ' + yearsInBusiness + ' years. Fully insured, all work guaranteed. Meet the team.',
    canonical: BASE_URL + '/about',
    ogImage: BASE_URL + '/og-image.jpg',
    type: 'website',
    keywords: ['roofer ' + CLIENT.area.toLowerCase(), 'roofing company ' + CLIENT.area.toLowerCase()],
  }

  const structuredData = buildStructuredData(page, [
    getBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'About', url: page.canonical },
    ]),
  ])

  const highlights = [
    { icon: Award, value: yearsInBusiness + '+ Years', label: 'Serving ' + CLIENT.area },
    { icon: ShieldCheck, value: '\u00A3' + CLIENT.insuranceAmount, label: 'Public Liability' },
    { icon: CheckCircle, value: '20 Year', label: 'Reroof Guarantee' },
    { icon: Clock, value: 'Same Day', label: 'Emergency Response' },
  ]

  return (
    <>
      <SeoHead page={page} structuredData={structuredData} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-600 no-underline text-slate-400">Home</Link>
            <span>/</span>
            <span className="text-slate-600">About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-[clamp(28px,5vw,44px)] leading-[1.1] text-slate-800 mb-5">
            {'About '}
            <span style={{ color: 'var(--color-brand)' }}>{CLIENT.businessName}</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {'Established in ' + CLIENT.yearEstablished + ', ' + CLIENT.businessName + ' has been providing reliable, high-quality roofing services to homes and businesses across ' + CLIENT.area + ' and ' + CLIENT.region + ' for over ' + yearsInBusiness + ' years.'}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h) => (
              <div key={h.label} className="card p-5 text-center">
                <h.icon size={24} className="mx-auto mb-2" style={{ color: 'var(--color-brand)' }} />
                <div className="font-heading text-xl text-slate-800">{h.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 section-warm">
        <div className="mx-auto max-w-3xl">
          <div className="text-[15px] text-slate-600 leading-[1.85] space-y-5">
            <h2 className="font-heading text-2xl text-slate-800 mb-4">Our Story</h2>
            <p>
              {CLIENT.businessName + ' was founded by ' + CLIENT.ownerName + ' in ' + CLIENT.yearEstablished + ' with a simple idea: treat every roof as if it were your own. What started as a one-man operation has grown into a trusted local roofing company serving the whole of ' + CLIENT.area + ' and ' + CLIENT.region + '.'}
            </p>
            <p>
              {'Over ' + yearsInBusiness + ' years, we have built our reputation on honest quotes, clean workmanship, and standing behind every job with a written guarantee. We do not subcontract \u2014 every job is completed by our own experienced team. We do not use high-pressure sales tactics. We give you a fair quote, explain your options clearly, and let you decide.'}
            </p>

            <h2 className="font-heading text-2xl text-slate-800 !mt-10 mb-4">Our Guarantee</h2>
            <p>
              {'Every job comes with a written guarantee. Repairs are guaranteed for 12 months. Full reroofs are guaranteed for 20 years on both materials and workmanship. Flat roof installations are guaranteed for the lifetime of the membrane system \u2014 typically 25 years or more.'}
            </p>
            <p>
              {'We also carry \u00A3' + CLIENT.insuranceAmount + ' public liability insurance on every job. We can provide a copy of our insurance certificate on request before any work begins. Your home is fully protected from the moment we arrive.'}
            </p>

            <h2 className="font-heading text-2xl text-slate-800 !mt-10 mb-4">What We Do</h2>
            <p>
              {'We provide a full range of roofing services including:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
              {CLIENT.services.map((s) => (
                <Link
                  key={s.slug}
                  to={'/' + s.slug}
                  className="flex items-center gap-2 text-sm no-underline text-slate-600 hover:text-amber-700 transition-colors"
                >
                  <CheckCircle size={15} style={{ color: 'var(--color-success)' }} />
                  {s.name + ' \u2014 from \u00A3' + s.priceFrom}
                </Link>
              ))}
            </div>

            <h2 className="font-heading text-2xl text-slate-800 !mt-10 mb-4">Get in Touch</h2>
            <p>
              {'Whether you have an emergency leak, need a quote for a full reroof, or just want advice on the best course of action for your roof, we are here to help. Call us on ' + CLIENT.phone + ' or use the quote tool on our homepage to get a response within 24 hours.'}
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
