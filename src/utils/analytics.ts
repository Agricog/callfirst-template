// ============================================================
// CallFirst Client Template — Analytics
// ============================================================

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (
      command: string,
      eventName: string,
      params: Record<string, string | number | boolean>
    ) => void
    gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    })
  }
}

export function trackCta(ctaName: string, location: string): void {
  trackEvent('cta_click', { cta_name: ctaName, location })
}

export function trackPhoneCall(location: string): void {
  trackEvent('phone_call', { location })
}

export function trackChatStart(): void {
  trackEvent('chat_start', {})
}

export function trackChatComplete(): void {
  trackEvent('chat_complete', {})
}

export function trackFaqOpen(index: number): void {
  trackEvent('faq_open', { faq_index: index })
}

export function trackServiceView(serviceName: string): void {
  trackEvent('service_view', { service_name: serviceName })
}

export function trackAreaView(areaName: string): void {
  trackEvent('area_view', { area_name: areaName })
}
