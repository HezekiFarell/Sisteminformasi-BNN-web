'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, FileText, Video, MessageCircle } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Kosongkan sesi jika perlu
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Dashboard Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            href="/admin/artikel"
            className="bg-blue-50 p-6 rounded-xl hover:shadow-md transition text-center"
          >
            <FileText className="mx-auto text-blue-600 mb-3" size={40} />
            <h2 className="text-lg font-semibold text-blue-900">Kelola Artikel</h2>
            <p className="text-sm mt-2 text-gray-700">Tambah, edit, atau hapus artikel edukasi.</p>
          </Link>

          <Link
            href="/admin/video"
            className="bg-green-50 p-6 rounded-xl hover:shadow-md transition text-center"
          >
            <Video className="mx-auto text-green-600 mb-3" size={40} />
            <h2 className="text-lg font-semibold text-green-900">Kelola Video</h2>
            <p className="text-sm mt-2 text-gray-700">Unggah dan kelola video edukasi.</p>
          </Link>

          <Link
            href="/admin/konsultasi"
            className="bg-purple-50 p-6 rounded-xl hover:shadow-md transition text-center"
          >
            <MessageCircle className="mx-auto text-purple-600 mb-3" size={40} />
            <h2 className="text-lg font-semibold text-purple-900">Kelola Konsultasi</h2>
            <p className="text-sm mt-2 text-gray-700">Lihat semua pesan masuk dari pengguna.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
