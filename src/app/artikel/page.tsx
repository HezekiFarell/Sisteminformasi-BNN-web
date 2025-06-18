import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export const revalidate = 60; // ISR, update setiap 60 detik

export default async function ArtikelPage() {
  const supabase = createClient();

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, content, created_at, slug')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
  }

  if (!articles || articles.length === 0) {
    return <p className="p-6 text-center text-gray-600">Belum ada artikel edukasi.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Tombol kembali ke beranda */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Artikel Edukasi</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/artikel/${article.slug}`}
            className="block bg-white shadow-md hover:shadow-xl border border-gray-200 rounded-lg p-5 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-3">
              Dipublikasikan: {new Date(article.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p
              className="text-gray-700 text-sm line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: article.content.length > 200
                  ? article.content.slice(0, 200) + '...'
                  : article.content,
              }}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
