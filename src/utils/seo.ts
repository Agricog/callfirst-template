// ============================================================
// CallFirst Client Template — SEO Utilities
// Generates all structured data and meta tags per page
// ============================================================

import { CLIENT } from '@/data/clientConfig'
import type { SeoPageData, ServiceConfig } from '@/types'

const BASE_URL = `https://${CLIENT.domain}`

// ── LocalBusiness Schema (appears on every page) ──
export function getLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: CLIENT.businessName,
    description: CLIENT.tagline,
    url: BASE_URL,
    telephone: CLIENT.phone,
    foundingDate: String(CLIENT.yearEstablished),
    areaServed: CLIENT.areasServed.map((area) => ({
      '@type': 'City',
      name: area.name,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: CLIENT.area,
      addressRegion: CLIENT.region,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.7184,
      longitude: -3.5339,
    },
    priceRange: '\u00A3\u00A3',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(CLIENT.googleReviewRating),
      reviewCount: String(CLIENT.googleReviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${CLIENT.trade} Services`,
      itemListElement: CLIENT.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.shortDescription,
        },
      })),
    },
  }
}

// ── WebSite Schema ──
export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: `${CLIENT.trade} ${CLIENT.area} | ${CLIENT.businessName}`,
    publisher: { '@id': `${BASE_URL}/#business` },
  }
}

// ── WebPage Schema ──
export function getWebPageSchema(page: SeoPageData) {
  return {
    '@type': 'WebPage',
    '@id': `${page.canonical}/#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#business` },
  }
}

// ── FAQPage Schema ──
export function getFaqSchema() {
  return {
    '@type': 'FAQPage',
    mainEntity: CLIENT.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ── Service Schema ──
export function getServiceSchema(service: ServiceConfig) {
  return {
    '@type': 'Service',
    '@id': `${BASE_URL}/${service.slug}/#service`,
    name: `${service.name} in ${CLIENT.area}`,
    description: service.longDescription,
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: CLIENT.areasServed.map((a) => ({
      '@type': 'City',
      name: a.name,
    })),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'GBP',
        minPrice: String(service.priceFrom),
        maxPrice: String(service.priceTo),
      },
    },
  }
}

// ── BreadcrumbList Schema ──
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ── Full page structured data ──
export function buildStructuredData(
  page: SeoPageData,
  extras: Record<string, unknown>[] = []
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessSchema(),
      getWebSiteSchema(),
      getWebPageSchema(page),
      ...extras,
    ],
  }
}

// ── Homepage structured data ──
export function getHomepageStructuredData() {
  const page: SeoPageData = {
    title: `${CLIENT.trade} ${CLIENT.area} | ${CLIENT.businessName} | Trusted Local Roofers`,
    description: `Get a ${CLIENT.trade.toLowerCase()} quote in ${CLIENT.area} in 24 hours. ${CLIENT.businessName} \u2014 ${CLIENT.tagline}. Free quotes, all work guaranteed.`,
    canonical: BASE_URL,
    ogImage: `${BASE_URL}/og-image.jpg`,
    type: 'website',
    keywords: [],
  }

  return {
    page,
    data: buildStructuredData(page, [getFaqSchema()]),
  }
}

// ── Service page structured data ──
export function getServicePageStructuredData(service: ServiceConfig) {
  const page: SeoPageData = {
    title: `${service.name} ${CLIENT.area} | ${CLIENT.businessName} | From \u00A3${service.priceFrom}`,
    description: `${service.shortDescription} ${CLIENT.businessName} in ${CLIENT.area}. Free quotes, all work guaranteed. Call ${CLIENT.phone}.`,
    canonical: `${BASE_URL}/${service.slug}`,
    ogImage: `${BASE_URL}/og-image.jpg`,
    type: 'website',
    keywords: service.keywords,
  }

  return {
    page,
    data: buildStructuredData(page, [
      getServiceSchema(service),
      getBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: service.name, url: page.canonical },
      ]),
    ]),
  }
}

// ── Area page structured data ──
export function getAreaPageStructuredData(areaName: string, areaSlug: string) {
  const page: SeoPageData = {
    title: `Roofer ${areaName} | ${CLIENT.businessName} | Trusted Local Roofers`,
    description: `Looking for a roofer in ${areaName}? ${CLIENT.businessName} provides roof repairs, reroofs, and emergency call-outs across ${areaName}. Free quotes. Call ${CLIENT.phone}.`,
    canonical: `${BASE_URL}/areas/${areaSlug}`,
    ogImage: `${BASE_URL}/og-image.jpg`,
    type: 'website',
    keywords: [`roofer ${areaName.toLowerCase()}`, `roofing ${areaName.toLowerCase()}`, `roof repair ${areaName.toLowerCase()}`],
  }

  return {
    page,
    data: buildStructuredData(page, [
      getBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Areas', url: `${BASE_URL}/areas` },
        { name: areaName, url: page.canonical },
      ]),
    ]),
  }
}
