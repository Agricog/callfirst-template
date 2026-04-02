// ============================================================
// CallFirst Client Template — AI Chat Intake
// Core conversion widget — connects to CallFirst API
// ============================================================

import { useState, useRef, useEffect, useCallback } from 'react'
import { CLIENT } from '@/data/clientConfig'

interface Message {
  role: 'assistant' | 'user'
  content: string
  timestamp: string
}

const API_URL = import.meta.env.VITE_API_URL || ''
const API_KEY = import.meta.env.VITE_API_KEY || ''
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || ''

export default function AiChatIntake(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show greeting on mount — no API call needed
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi! I'm the ${CLIENT.businessName} assistant. What roofing work do you need help with?`,
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  // Auto-scroll INSIDE the chat box only — not the whole page
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return

      setError(null)
      const userMessage: Message = {
        role: 'user',
        content: userText.trim(),
        timestamp: new Date().toISOString(),
      }

      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setInput('')
      setIsLoading(true)

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            clientId: CLIENT_ID,
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            })),
          }),
        })

        if (!res.ok) {
          throw new Error(`Server error (${res.status})`)
        }

        const data = await res.json()

        const assistantMessage: Message = {
          role: 'assistant',
          content:
            data.message ||
            data.content ||
            data.response ||
            'Sorry, something went wrong. Please try again.',
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        console.error('Chat error:', err)
        setError(
          `Unable to connect. Please try again or call ${CLIENT.phone}.`
        )
      } finally {
        setIsLoading(false)
        inputRef.current?.focus()
      }
    },
    [messages, isLoading]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="ai-chat-container w-full max-w-[420px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 text-white px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
          {CLIENT.businessName
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)}
        </div>
        <div>
          <div className="font-semibold text-sm">{CLIENT.businessName}</div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Online now
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[360px] bg-slate-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-white rounded-br-md'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-xs text-red-500 py-1">{error}</div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 text-sm px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-colors"
            disabled={isLoading}
            aria-label="Type your message"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Send message"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
