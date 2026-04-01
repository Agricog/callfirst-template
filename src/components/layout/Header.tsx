// ============================================================
// CallFirst Client Template — Header
// Sticky, conversion-focused, mobile-first
// ============================================================

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X, AlertTriangle } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { trackPhoneCall } from '@/utils/analytics'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Areas', href: '/areas' },
  { label: 'About', href: '/about' },
  { label: 'Emergency', href: '/emergency', emergency: true },
]

export default function Header(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const phoneClean = CLIENT.phone.replace(/\s/g, '')

  return (
    <>
      {/* Emergency Banner */}
      <div className="emergency-banner">
        <AlertTriangle size={14} className="inline -mt-0.5 mr-1.5" />
        {'Emergency roof repair? We can attend today. '}
        <a
          href={'/emergency'}
          onClick={() => trackPhoneCall('emergency_banner')}
        >
          Get help now
        </a>
      </div>

      {/* Main Header */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(15, 23, 41, 0.97)' : 'rgba(15, 23, 41, 1)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link
            to="/"
            className="no-underline flex items-center gap-2"
            aria-label={CLIENT.businessName + ' home'}
          >
            <span
              className="font-heading text-[22px] md:text-[26px] text-white"
            >
              {CLIENT.businessName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={
                  'px-4 py-2 rounded-lg text-[14px] font-medium no-underline transition-colors ' +
                  (link.emergency
                    ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                    : location.pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5')
                }
              >
                {link.emergency && (
                  <AlertTriangle size={14} className="inline -mt-0.5 mr-1" />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={'tel:' + phoneClean}
              className="flex items-center gap-2 text-slate-300 hover:text-white text-[14px] font-medium no-underline transition-colors"
              onClick={() => trackPhoneCall('header')}
            >
              <Phone size={15} />
              {CLIENT.phone}
            </a>
            <Link
              to="/#quote"
              className="btn-primary !py-2.5 !px-5 !text-[13px]"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile: Phone + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={'tel:' + phoneClean}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white no-underline"
              aria-label={'Call ' + CLIENT.businessName}
              onClick={() => trackPhoneCall('header_mobile')}
            >
              <Phone size={18} />
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white border-none cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-white/10 animate-slide-up"
            style={{ background: 'rgba(15, 23, 41, 0.98)' }}
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={
                    'px-4 py-3 rounded-lg text-[15px] font-medium no-underline transition-colors ' +
                    (link.emergency
                      ? 'text-red-400 bg-red-500/10'
                      : location.pathname === link.href
                        ? 'text-white bg-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5')
                  }
                >
                  {link.emergency && (
                    <AlertTriangle size={14} className="inline -mt-0.5 mr-1.5" />
                  )}
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  to="/#quote"
                  className="btn-primary w-full !text-[15px]"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
