'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  deskripsi?: string;
}

export default function VideoPage() {
  const supabase = createClient();
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk konversi url YouTube ke format embed (jika belum embed)
  const convertToEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    // Kalau bukan URL YouTube, kembalikan url asli
    return url;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Gagal memuat video:', error);
        setVideoList([]);
      } else {
        // Konversi url semua video ke embed url
        const videosWithEmbedUrl = (data || []).map((video) => ({
          ...video,
          url: convertToEmbedUrl(video.url),
        }));
        setVideoList(videosWithEmbedUrl);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-white px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Video Edukasi</h1>
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Kembali ke Beranda
      </Link>

      {loading ? (
        <p>Memuat video...</p>
      ) : videoList.length === 0 ? (
        <p>Belum ada video yang tersedia.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <iframe
                className="w-full aspect-video"
                src={video.url}
                title={video.title}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{video.title}</h2>
                <p className="text-sm text-gray-600">{video.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
