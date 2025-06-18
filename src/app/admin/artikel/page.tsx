'use client';
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  created_at: string;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminArtikelPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
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
  }, [supabase]);

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
  }, [fetchArticles]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Artikel</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Judul artikel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Konten artikel"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={5}
        />
        <button
          onClick={addOrUpdateArticle}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {editingId ? 'Update Artikel' : 'Tambah Artikel'}
        </button>
        {editingId && (
          <button
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Batal
          </button>
        )}
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Daftar Artikel</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-gray-700">{article.content}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => editArticle(article)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
