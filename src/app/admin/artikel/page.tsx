'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  created_at: string;
}

// Fungsi untuk membuat slug dari judul artikel
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // ganti spasi & karakter non-alfanumerik jadi '-'
    .replace(/^-+|-+$/g, '');    // hapus strip di awal & akhir
}

export default function AdminArtikelPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } else {
      setArticles(data || []);
    }
  };

  const addOrUpdateArticle = async () => {
    if (!title || !content) {
      alert('Judul dan konten artikel harus diisi!');
      return;
    }

    setLoading(true);
    const slug = generateSlug(title);

    if (editingId) {
      const { error } = await supabase
        .from('articles')
        .update({ title, content, slug })
        .eq('id', editingId);

      if (error) {
        alert('Gagal mengedit artikel.');
        console.error(error);
      } else {
        resetForm();
        fetchArticles();
      }
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([{ title, content, slug }]);

      if (error) {
        alert('Gagal menambahkan artikel.');
        console.error(error);
      } else {
        resetForm();
        fetchArticles();
      }
    }

    setLoading(false);
  };

  const editArticle = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setContent(article.content);
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus artikel.');
      console.error(error);
    } else {
      fetchArticles();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kelola Artikel Edukasi</h1>
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Kembali ke Admin
        </Link>
      </div>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Judul Artikel"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Isi Konten Artikel"
          className="w-full p-2 border rounded min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={addOrUpdateArticle}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? (loading ? 'Menyimpan...' : 'Simpan Perubahan') : loading ? 'Menambahkan...' : 'Tambah Artikel'}
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
        {articles.length === 0 && <p>Belum ada artikel yang tersedia.</p>}
        {articles.map((article) => (
          <li
            key={article.id}
            className="p-4 border rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="max-w-xl">
              <p className="font-semibold text-lg">{article.title}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {article.content.length > 150 ? article.content.slice(0, 150) + '...' : article.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(article.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                onClick={() => editArticle(article)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteArticle(article.id)}
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
