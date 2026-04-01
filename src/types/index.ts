// ============================================================
// CallFirst Client Template — Type Definitions
// ============================================================

export interface ClientConfig {
  businessName: string
  ownerName: string
  trade: string
  area: string
  region: string
  phone: string
  tagline: string
  domain: string
  discountActive: boolean
  discountPercent: number
  googleReviewUrl: string
  googleReviewCount: number
  googleReviewRating: number
  yearEstablished: number
  insuranceAmount: string

  trustSignals: TrustSignal[]
  services: ServiceConfig[]
  areasServed: AreaConfig[]
  faqs: FaqItem[]
  estimateRange: EstimateRange[]
}

export interface TrustSignal {
  icon: string
  title: string
  description: string
}

export interface ServiceConfig {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  priceFrom: number
  priceTo: number
  icon: string
  features: string[]
  keywords: string[]
}

export interface AreaConfig {
  name: string
  slug: string
  description: string
  distanceFromBase: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface EstimateRange {
  size: string
  low: number
  high: number
}

export interface IntakeStep {
  id: string
  question: string
  field: string
  options: { label: string; value: string }[]
}

export interface LeadData {
  customerName: string
  customerPhone: string
  jobType: string
  propertyType: string
  estimatedDuration: string
  estimatedValue: string
  callbackTime: string
  leadScore: string
  area: string
  suggestedOpener: string
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SeoPageData {
  title: string
  description: string
  canonical: string
  ogImage: string
  type: 'website' | 'article'
  keywords: string[]
}
