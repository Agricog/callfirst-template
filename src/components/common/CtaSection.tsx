// ============================================================
// CallFirst Client Template — CTA Section
// Bottom call-to-action with phone and quote button
// ============================================================
import { useCallback } from 'react'
import { Phone, ChevronRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CLIENT } from '@/data/clientConfig'
import { trackCta, trackPhoneCall } from '@/utils/analytics'

interface CtaSectionProps {
  heading?: string
  subheading?: string
}

export default function CtaSection({
  heading = 'Need a roofer in ' + CLIENT.area + '?',
  subheading = 'Get your free quote in under 30 seconds. ' + CLIENT.ownerName + ' will call you back the same day.',
}: CtaSectionProps): JSX.Element {
  const phoneClean = CLIENT.phone.replace(/\s/g, '')
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToChat = useCallback(() => {
    trackCta('get_quote', 'bottom_cta')
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector('.ai-chat-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
          document.querySelector<HTMLInputElement>('.ai-chat-container input')?.focus()
        }, 500)
      }, 300)
    } else {
      document.querySelector('.ai-chat-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('.ai-chat-container input')?.focus()
      }, 500)
    }
  }, [location.pathname, navigate])

  return (
    <section
      className="py-20 px-4 text-center"
      style={{
        background: 'linear-gradient(135deg, var(--color-slate-900) 0%, var(--color-slate-800) 100%)',
      }}
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-2xl md:text-[36px] text-white mb-4 leading-tight">
          {heading}
        </h2>
        <p className="text-slate-400 text-base mb-10 max-w-md mx-auto leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="btn-primary !py-4 !px-8 !text-base"
            onClick={scrollToChat}
          >
            Get a Free Quote
            <ChevronRight size={18} />
          </button>
          <a
            href={'tel:' + phoneClean}
            className="btn-phone !py-4 !px-8 !text-base"
            onClick={() => trackPhoneCall('bottom_cta')}
          >
            <Phone size={18} />
            {CLIENT.phone}
          </a>
        </div>
        <p className="text-slate-500 text-xs mt-6">
          {'No obligation. No call-out fee for quotes. ' + CLIENT.insuranceAmount + ' public liability insured.'}
        </p>
      </div>
    </section>
  )
}
