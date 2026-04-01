// ============================================================
// CallFirst Client Template — AI Chat Intake
// Core conversion widget — connects to CallFirst API
// ============================================================

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, MessageCircle, CheckCircle } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'
import { trackChatStart, trackChatComplete } from '@/utils/analytics'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const API_URL = import.meta.env.VITE_API_URL || ''
const API_KEY = import.meta.env.VITE_API_KEY || ''
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || ''

export default function AiChatIntake(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  // Show greeting on mount — no API call needed
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: 'Hi! I\'m the ' + CLIENT.businessName + ' assistant. What roofing work do you need help with?'
    }])
  }, [])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading || isComplete) return

    if (!hasStarted) {
      setHasStarted(true)
      trackChatStart()
    }

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch(API_URL + '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_KEY,
        },
        body: JSON.stringify({
          clientId: CLIENT_ID,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userMessage: trimmed,
        }),
      })

      if (!res.ok) throw new Error('Failed to get response')

      const data = await res.json()
      let assistantContent = data.response || data.message || ''

      // Check for lead data
      if (data.complete || assistantContent.includes('|||LEAD_DATA|||')) {
        const leadMatch = assistantContent.match(
          /\|\|\|LEAD_DATA\|\|\|([\s\S]*?)\|\|\|END_LEAD\|\|\|/
        )

        // Strip hidden data block from visible message
        assistantContent = assistantContent
          .replace(/\|\|\|LEAD_DATA\|\|\|[\s\S]*?\|\|\|END_LEAD\|\|\|/, '')
          .trim()

        if (leadMatch) {
          try {
            const leadData = JSON.parse(leadMatch[1])
            // Submit lead to API
            await fetch(API_URL + '/api/lead', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_KEY,
              },
              body: JSON.stringify({
                clientId: CLIENT_ID,
                ...leadData,
                conversationLog: [...updatedMessages, { role: 'assistant', content: assistantContent }],
              }),
            }).catch(() => {
              // Lead submission failed silently
            })
          } catch {
            // JSON parse failed
          }
        }

        setIsComplete(true)
        trackChatComplete()
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantContent }])
    } catch {
      setError('Unable to connect. Please try again or call ' + CLIENT.phone + '.')
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }, [input, messages, isLoading, isComplete, hasStarted])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-lg"
      style={{
        background: 'white',
        border: '1px solid var(--color-slate-200)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{
          background: 'var(--color-slate-900)',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(217, 119, 6, 0.15)' }}
        >
          <MessageCircle size={18} style={{ color: 'var(--color-brand-light)' }} />
        </div>
        <div>
          <div className="text-white text-sm font-semibold">
            {CLIENT.businessName}
          </div>
          <div className="text-slate-400 text-xs">
            {isComplete ? 'All done!' : isLoading ? 'Typing...' : 'Online now'}
          </div>
        </div>
      </div>

      {/* Complete banner */}
      {isComplete && (
        <div
          className="px-5 py-3 flex items-center gap-2 text-sm font-medium"
          style={{
            background: 'var(--color-brand-50)',
            color: 'var(--color-brand-dark)',
            borderBottom: '1px solid rgba(217, 119, 6, 0.1)',
          }}
        >
          <CheckCircle size={16} />
          {"All done \u2014 " + CLIENT.ownerName + " will be in touch!"}
        </div>
      )}

      {/* Messages */}
      <div
        className="px-4 py-4 space-y-3 overflow-y-auto"
        style={{ minHeight: '300px', maxHeight: '400px' }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              'max-w-[85%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl animate-fade-in ' +
              (msg.role === 'user'
                ? 'ml-auto text-white rounded-br-sm'
                : 'text-slate-700 rounded-bl-sm')
            }
            style={
              msg.role === 'user'
                ? { background: 'var(--color-brand)' }
                : { background: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)' }
            }
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div
            className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm"
            style={{ background: 'var(--color-slate-50)', border: '1px solid var(--color-slate-100)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 px-2">{error}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isComplete && (
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderTop: '1px solid var(--color-slate-100)' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
            aria-label="Type your message"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors disabled:opacity-30"
            style={{
              background: 'var(--color-brand)',
              color: 'white',
            }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
