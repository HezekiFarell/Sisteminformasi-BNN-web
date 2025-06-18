import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export default async function ArtikelDetailPage({ params }: Props) {
  const supabase = createClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .limit(1)
    .single();

  if (error || !article) {
    return notFound();
  }

  const { data: rekomendasi, error: errorRekom } = await supabase
    .from('articles')
    .select('id, title, slug, created_at')
    .neq('slug', params.slug)
    .limit(4);

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 relative">
        {/* Tombol kembali */}
        <Link
          href="/artikel"
          className="absolute -top-6 left-0 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Kembali ke Artikel
        </Link>

        {/* Judul dan metadata */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Dipublikasikan pada{' '}
          {new Date(article.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        {/* Konten artikel */}
        <article
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Rekomendasi artikel */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Baca Artikel Lainnya
          </h2>

          {errorRekom && (
            <p className="text-red-600">Gagal memuat rekomendasi artikel.</p>
          )}

          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            {rekomendasi && rekomendasi.length > 0 ? (
              rekomendasi.map((item) => (
                <Link
                  key={item.id}
                  href={`/artikel/${item.slug}`}
                  className="block p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 shadow-sm hover:shadow-lg transition group"
                >
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">Belum ada artikel lain untuk direkomendasikan.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
