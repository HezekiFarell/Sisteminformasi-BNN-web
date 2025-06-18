'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Message = {
  id: string
  name: string
  phone: string
  content: string
  created_at: string
}

export default function AdminKonsultasiPage() {
  const [messages, setMessages] = useState<Message[]>([])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching messages:', error)
    else setMessages(data)
  }

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) {
      console.error('Gagal menghapus:', error)
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-800">📬 Pesan Masuk Konsultasi</h1>
          <Link href="/admin/dashboard" className="text-sm text-blue-600 underline">
            ⏎ Kembali ke Dashboard
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-600">Belum ada pesan masuk.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-blue-700">{msg.name} ({msg.phone})</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                    <p>{msg.content}</p>
                  </div>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
