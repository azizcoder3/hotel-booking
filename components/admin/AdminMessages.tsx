'use client'

import { Mail, Clock, User, Tag } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: string
}

export default function AdminMessages({ messages }: { messages: Message[] }) {
  
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Aucun message reçu pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            
            {/* Infos Expéditeur */}
            <div className="flex items-start gap-3 min-w-[200px]">
              <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-sm text-indigo-600 hover:underline">
                  {msg.email}
                </a>
              </div>
            </div>

            {/* Contenu du message */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-800">{msg.subject}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                {msg.message}
              </p>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
              <Clock className="h-3 w-3" />
              {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
              })}
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}