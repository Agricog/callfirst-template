// ============================================================
// CallFirst Client Template — Footer
// ============================================================

import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'

export default function Footer(): JSX.Element {
  const phoneClean = CLIENT.phone.replace(/\s/g, '')
  const currentYear = new Date().getFullYear()
  const yearsInBusiness = currentYear - CLIENT.yearEstablished

  return (
    <footer style={{ background: 'var(--color-slate-900)' }}>
      {/* Main Footer */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="font-heading text-2xl text-white mb-3">
              {CLIENT.businessName}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {CLIENT.tagline + '. Established ' + CLIENT.yearEstablished + ' \u2014 ' + yearsInBusiness + ' years of trusted service.'}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <div className="stars text-sm">
                {'\u2605\u2605\u2605\u2605\u2605'}
              </div>
              <span className="text-slate-400 text-xs">
                {CLIENT.googleReviewRating + '/5 from ' + CLIENT.googleReviewCount + ' reviews'}
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {CLIENT.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={'/' + service.slug}
                    className="text-slate-400 hover:text-white text-sm no-underline transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/emergency"
                  className="text-red-400 hover:text-red-300 text-sm no-underline transition-colors"
                >
                  Emergency Repairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Areas */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Areas We Cover
            </h3>
            <ul className="space-y-2.5">
              {CLIENT.areasServed.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link
                    to={'/areas/' + area.slug}
                    className="text-slate-400 hover:text-white text-sm no-underline transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
              {CLIENT.areasServed.length > 8 && (
                <li>
                  <Link
                    to="/areas"
                    className="text-slate-400 hover:text-white text-sm no-underline transition-colors"
                  >
                    {'View all ' + CLIENT.areasServed.length + ' areas \u2192'}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={'tel:' + phoneClean}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm no-underline transition-colors"
                >
                  <Phone size={15} className="shrink-0" />
                  {CLIENT.phone}
                </a>
              </li>
              <li>
                <a
                  href={'mailto:hello@' + CLIENT.domain}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm no-underline transition-colors"
                >
                  <Mail size={15} className="shrink-0" />
                  {'hello@' + CLIENT.domain}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                <span>{CLIENT.area + ', ' + CLIENT.region}</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Clock size={15} className="shrink-0 mt-0.5" />
                <span>{'Mon\u2013Fri 7am\u20136pm\nSat 8am\u20132pm\nEmergency: 24/7'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-white/10"
        style={{ background: 'rgba(0,0,0,0.2)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-slate-500 text-xs">
            {'\u00A9 ' + currentYear + ' ' + CLIENT.businessName + '. All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/privacy"
              className="text-slate-500 hover:text-slate-300 no-underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-slate-500 hover:text-slate-300 no-underline transition-colors"
            >
              Terms
            </Link>
            <span className="text-slate-600">{'Powered by '}</span>
            <a
              href="https://callfirst.co.uk"
              className="text-slate-500 hover:text-slate-300 no-underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              CallFirst
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
