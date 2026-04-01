// ============================================================
// CallFirst Client Template — SEO Head Component
// Implements all 15 SEO points via Helmet
// ============================================================

import { Helmet } from 'react-helmet-async'
import type { SeoPageData } from '@/types'

interface SeoHeadProps {
  page: SeoPageData
  structuredData: Record<string, unknown>
}

export default function SeoHead({ page, structuredData }: SeoHeadProps): JSX.Element {
  return (
    <Helmet>
      {/* Point 1: Title Tag (55-60 chars) */}
      <title>{page.title}</title>

      {/* Point 2: Meta Description (150-160 chars) */}
      <meta name="description" content={page.description} />

      {/* Point 3: Canonical URL */}
      <link rel="canonical" href={page.canonical} />

      {/* Point 4: Robots Meta */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Point 5: Viewport Meta */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />

      {/* Point 6: OG Title */}
      <meta property="og:type" content={page.type} />
      <meta property="og:title" content={page.title} />
      <meta property="og:url" content={page.canonical} />

      {/* Point 7: OG Description */}
      <meta property="og:description" content={page.description} />

      {/* Point 8: OG Image (1200x630px) */}
      <meta property="og:image" content={page.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={page.title} />

      {/* Point 9: Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={page.ogImage} />

      {/* Point 10: Author & Brand Signals */}
      <meta name="author" content={page.title.split('|').pop()?.trim() || ''} />

      {/* Language */}
      <html lang="en-GB" />

      {/* Point 11: JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
