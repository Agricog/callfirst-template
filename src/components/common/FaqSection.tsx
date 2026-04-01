// ============================================================
// CallFirst Client Template — FAQ Section
// Accessible accordion with smooth animation
// ============================================================

import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { trackFaqOpen } from '@/utils/analytics'

interface FaqSectionProps {
  title?: string
  faqs?: { question: string; answer: string }[]
  maxItems?: number
}

export default function FaqSection({
  title = 'Frequently Asked Questions',
  faqs = CLIENT.faqs,
  maxItems,
}: FaqSectionProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const displayFaqs = maxItems ? faqs.slice(0, maxItems) : faqs

  const handleToggle = useCallback(
    (index: number) => {
      const next = openIndex === index ? null : index
      setOpenIndex(next)
      if (next !== null) trackFaqOpen(next)
    },
    [openIndex]
  )

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="font-heading text-2xl md:text-[32px] text-slate-800 text-center mb-10">
        {title}
      </h2>

      <div className="space-y-2" role="list">
        {displayFaqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              role="listitem"
              className="card overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left bg-transparent border-none cursor-pointer"
                onClick={() => handleToggle(i)}
                aria-expanded={isOpen}
                aria-controls={'faq-answer-' + i}
              >
                <span className="font-semibold text-[15px] text-slate-800 leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-slate-400 transition-transform duration-200"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {isOpen && (
                <div
                  id={'faq-answer-' + i}
                  className="px-5 pb-5 text-[14px] text-slate-500 leading-relaxed animate-fade-in"
                  role="region"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
