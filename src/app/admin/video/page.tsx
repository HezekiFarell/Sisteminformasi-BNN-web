'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function AdminVideoPage() {
  const supabase = createClient();
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('id', { ascending: false });
    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      setVideos(data);
    }
  };

  // Convert URL biasa ke format embed
  const convertToEmbedUrl = (youtubeUrl: string): string => {
    const match = youtubeUrl.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : youtubeUrl;
  };

  const addOrUpdateVideo = async () => {
    if (!title || !url) {
      alert('Judul dan URL video harus diisi!');
      return;
    }

    setLoading(true);
    const embedUrl = convertToEmbedUrl(url);

    if (editingId) {
      // Update mode
      const { error } = await supabase
        .from('videos')
        .update({ title, url: embedUrl, deskripsi })
        .eq('id', editingId);
      if (error) {
        alert('Gagal mengedit video.');
        console.error(error);
      } else {
        resetForm();
        fetchVideos();
      }
    } else {
      // Tambah baru
      const { error } = await supabase.from('videos').insert([
        {
          title,
          url: embedUrl,
          deskripsi,
        },
      ]);
      if (error) {
        alert('Gagal menambahkan video.');
        console.error(error);
      } else {
        resetForm();
        fetchVideos();
      }
    }

    setLoading(false);
  };

  const deleteVideo = async (id: string) => {
    const { error } = await supabase.from('videos').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus video.');
      console.error(error);
    } else {
      fetchVideos();
    }
  };

  const editVideo = (video: any) => {
    setEditingId(video.id);
    setTitle(video.title);
    setDeskripsi(video.deskripsi);
    setUrl(video.url);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setUrl('');
    setDeskripsi('');
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kelola Video Edukasi</h1>
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Kembali ke Admin
        </Link>
      </div>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Judul Video"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Deskripsi singkat"
          className="w-full p-2 border rounded"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL Video (YouTube atau lainnya)"
          className="w-full p-2 border rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={addOrUpdateVideo}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? (loading ? 'Menyimpan...' : 'Simpan Perubahan') : loading ? 'Menambahkan...' : 'Tambah Video'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-4">
        {videos.map((video) => (
          <li
            key={video.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{video.title}</p>
              <p className="text-sm mb-1">{video.deskripsi}</p>
              <a
                href={video.url}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Video
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editVideo(video)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteVideo(video.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
