'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabase = createClient(
  'https://hgeeahqvofcmwcdbelyk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZWVhaHF2b2ZjbXdjZGJlbHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1ODQ3NDUsImV4cCI6MjA2NDE2MDc0NX0.usfOhND0jFtlXhCrB8x8tAADbAIvpiUvexxNVdq4z0Q'
);

// Respon bot berdasarkan kata kunci
const botResponses: Record<string, string> = {
  narkoba: 'Narkoba adalah singkatan dari narkotika, psikotropika, dan zat adiktif lainnya. Hindari penyalahgunaan karena berdampak serius pada kesehatan dan hukum.',
  ciri: 'Ciri pengguna narkoba bisa meliputi perubahan perilaku, mata merah, emosi tidak stabil, dan penurunan berat badan drastis.',
  bantu: 'Ajak bicara temanmu dengan empati. Jangan menghakimi. Bawa ke layanan konseling atau rehabilitasi BNN.',
  layanan: 'BNN menyediakan layanan seperti edukasi, pencegahan, rehabilitasi, dan hotline konsultasi. Kunjungi website resmi atau kantor BNN terdekat.',
  rehab: 'Jika butuh bantuan rehabilitasi, kamu bisa datang langsung ke kantor BNN atau menghubungi layanan konseling di kota kamu.',
  kontak: 'Hubungi BNN di 021-80871260 atau email ke bnnkota.manado@gmail.com untuk bantuan lebih lanjut.',
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Simpan pesan ke Supabase
  const saveMessage = async (sender: 'user' | 'bot', content: string) => {
    await supabase.from('messages').insert({ name, phone, sender, content });
  };

  // Kirim pesan user dan respon bot
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);
    await saveMessage('user', text);

    setTimeout(async () => {
      const response =
        Object.entries(botResponses).find(([keyword]) =>
          text.toLowerCase().includes(keyword)
        )?.[1] ||
        'Maaf, saya belum memahami pertanyaan tersebut. Silakan hubungi bnnkota.manado@gmail.com.';

      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      await saveMessage('bot', response);
      setIsTyping(false);
    }, 1000);
  };

  // Scroll otomatis ke bawah saat pesan bertambah
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Form input nama & nomor
  if (!chatStarted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/40 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6 tracking-wide">
          👋 Selamat Datang!
        </h1>
        <p className="text-center text-sm text-blue-800 mb-6">
          Masukkan data dirimu untuk memulai konsultasi bersama AI BNN
        </p>

        {/* Input Nama */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/60 bg-white/60 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Input Telepon */}
        <div className="relative mb-6">
          <input
            type="tel"
            placeholder="Nomor Telepon Aktif"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/60 bg-white/60 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Tombol Mulai */}
        <button
          onClick={() => {
            if (name && phone) setChatStarted(true);
            else alert('⚠️ Isi nama dan nomor telepon terlebih dahulu.');
          }}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 font-semibold rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
        >
          🚀 Mulai Chat Konsultasi
        </button>

        {/* Catatan */}
        <p className="text-xs text-center text-gray-600 mt-4">
          Data Anda aman dan hanya digunakan untuk keperluan konsultasi BNN.
        </p>
      </div>
    </div>
  );
}

  // Tampilan chat setelah data diri diisi
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-t-lg shadow">
        <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          🧠 Chat Konsultasi BNN
        </h2>
        <button
          onClick={() => window.location.href = '/'}
          className="text-sm text-blue-700 hover:underline"
        >
          ⏎ Beranda
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-96 overflow-y-auto bg-white border-x border-b shadow p-4 space-y-3 rounded-b-lg" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-xs`}>
              {msg.sender === 'bot' && (
                <span className="text-blue-500 text-lg">🤖</span>
              )}
              <div className={`px-4 py-2 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200'}`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <span className="text-gray-400 text-lg">🧍‍♂️</span>
              )}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-sm text-gray-500 italic">🤖 Bot sedang mengetik...</div>}
      </div>

      {/* Topik Cepat */}
      <div className="bg-white border mt-6 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-700 font-medium mb-2">📌 Pilih Topik Cepat:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Apa itu Narkoba?', value: 'narkoba' },
            { label: 'Ciri pengguna narkoba', value: 'ciri' },
            { label: 'Cara bantu teman', value: 'bantu' },
            { label: 'Layanan BNN', value: 'layanan' },
            { label: 'Konsultasi Rehabilitasi', value: 'rehab' },
            { label: 'Kontak Darurat', value: 'kontak' },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => sendMessage(btn.label)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-3 py-2 rounded-lg transition"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Tulis pesan..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
        />
        <button
          onClick={() => sendMessage(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
