import Link from 'next/link';

const kategoriList = [
  {
    slug: 'pengetahuan-umum',
    nama: 'Pengetahuan Umum Narkotika',
    deskripsi: 'Dasar-dasar narkotika, jenis, dan dampaknya.',
  },
  {
    slug: 'pencegahan',
    nama: 'Pencegahan',
    deskripsi: 'Cara mencegah penyalahgunaan narkoba.',
  },
  {
    slug: 'hukum',
    nama: 'Dasar-dasar Hukum',
    deskripsi: 'Hukum dan perundang-undangan terkait narkotika.',
  }
];

export default function PilihKategori() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-800">
        Pilih Kategori Kuis
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {kategoriList.map((kategori) => (
          <Link
            key={kategori.slug}
            href={`/kuis/${kategori.slug}`}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border hover:border-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700">{kategori.nama}</h2>
            <p className="text-gray-600">{kategori.deskripsi}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="inline-block px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition">
          ⏎ Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
