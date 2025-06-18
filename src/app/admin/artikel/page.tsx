'use client';
import { useEffect, useState, useCallback } from 'react'; // ✅ useCallback ditambahkan
import Link from 'next/link';
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
  }, [supabase]); // ✅ tambahkan dependency jika perlu

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
  }, [fetchArticles]); // ✅ warning teratasi

  return (
    // ... (bagian UI tidak berubah)
    <main className="p-6 max-w-4xl mx-auto">
      {/* ... semua UI seperti sebelumnya */}
    </main>
  );
}
