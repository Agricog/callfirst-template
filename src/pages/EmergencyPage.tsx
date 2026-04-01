// ============================================================
// CallFirst Client Template — Emergency Page
// Targets: "emergency roofer [area]", "roof leak emergency"
// ============================================================

import { Phone, AlertTriangle, Clock, ShieldCheck } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { getLocalBusinessSchema, getWebSiteSchema, getBreadcrumbSchema } from '@/utils/seo'
import { trackPhoneCall } from '@/utils/analytics'
import SeoHead from '@/components/common/SeoHead'
import AiChatIntake from '@/components/AiChatIntake'
import CtaSection from '@/components/common/CtaSection'
import type { SeoPageData } from '@/types'

const BASE_URL = 'https://' + CLIENT.domain

export default function EmergencyPage(): JSX.Element {
  const phoneClean = CLIENT.phone.replace(/\s/g, '')

  const page: SeoPageData = {
    title: 'Emergency Roofer ' + CLIENT.area + ' | Same-Day Repairs | ' + CLIENT.businessName,
    description: 'Emergency roof repair in ' + CLIENT.area + '. Same-day attendance for leaks and storm damage. Call ' + CLIENT.phone + ' now. No inflated call-out fees. ' + CLIENT.businessName + '.',
    canonical: BASE_URL + '/emergency',
    ogImage: BASE_URL + '/og-image.jpg',
    type: 'website',
    keywords: ['emergency roofer ' + CLIENT.area.toLowerCase(), 'emergency roof repair ' + CLIENT.area.toLowerCase()],
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessSchema(),
      getWebSiteSchema(),
      {
        '@type': 'WebPage',
        url: page.canonical,
        name: page.title,
        description: page.description,
      },
      getBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Emergency', url: page.canonical },
      ]),
    ],
  }

  return (
    <>
      <SeoHead page={page} structuredData={structuredData} />

      {/* Urgent Hero */}
      <section
        className="py-12 md:py-20 px-4"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
                <AlertTriangle size={14} />
                Emergency Response
              </div>

              <h1 className="font-heading text-[clamp(28px,5vw,48px)] leading-[1.08] text-white mb-5">
                {'Emergency roof repair in '}
                <span className="text-amber-300">{CLIENT.area}</span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {'Leaking roof? Storm damage? ' + CLIENT.businessName + ' provides same-day emergency attendance across ' + CLIENT.area + ' and ' + CLIENT.region + '. We carry tarpaulins and repair materials on the van \u2014 your roof will be watertight today.'}
              </p>

              {/* Urgent phone CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a
                  href={'tel:' + phoneClean}
                  className="inline-flex items-center justify-center gap-3 bg-white text-red-700 font-bold text-lg px-8 py-4 rounded-xl no-underline shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => trackPhoneCall('emergency_hero')}
                >
                  <Phone size={22} />
                  {'Call Now: ' + CLIENT.phone}
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start text-white/70">
                {[
                  { icon: Clock, text: 'Same-day attendance' },
                  { icon: ShieldCheck, text: 'No inflated call-out fees' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm">
                    <item.icon size={16} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center w-full max-w-[440px] ai-chat-container">
              <AiChatIntake />
            </div>
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-[32px] text-slate-800 text-center mb-10">
            Got a roof emergency? Here is what to do.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Make it safe',
                description: 'Move furniture and valuables away from the leak. Put containers under active drips. If water is near electrics, turn off the power at the consumer unit.',
              },
              {
                step: '2',
                title: 'Call us',
                description: 'Call ' + CLIENT.phone + ' or use the chat above. Tell us what is happening and we will arrange same-day attendance.',
              },
              {
                step: '3',
                title: 'We make it watertight',
                description: 'We attend with tarpaulins and common repair materials. We make your property watertight on the first visit, then arrange a permanent repair.',
              },
            ].map((item) => (
              <div key={item.step} className="card p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-heading text-base mb-4"
                  style={{ background: '#fef2f2', color: '#dc2626' }}
                >
                  {item.step}
                </div>
                <h3 className="font-heading text-base text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Pricing */}
      <section className="py-16 px-4 section-warm">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl text-slate-800 mb-4">
            No inflated emergency prices
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto">
            {'Unlike some roofers, we do not double our prices for emergencies. Our emergency call-out rates are the same as our standard rates. An emergency tarpaulin to make your roof watertight typically costs \u00A3150\u2013\u00A3300, and a permanent repair is quoted separately at our normal prices.'}
          </p>
          <a
            href={'tel:' + phoneClean}
            className="btn-primary !bg-red-600 hover:!bg-red-700 !shadow-[0_2px_8px_rgba(220,38,38,0.3)]"
            onClick={() => trackPhoneCall('emergency_pricing')}
          >
            <Phone size={18} />
            {'Call ' + CLIENT.phone}
          </a>
        </div>
      </section>

      <CtaSection
        heading={'Roof emergency in ' + CLIENT.area + '?'}
        subheading={'Call us now on ' + CLIENT.phone + '. Same-day attendance across ' + CLIENT.area + ' and ' + CLIENT.region + '.'}
      />
    </>
  )
}
