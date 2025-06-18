"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const soalByKategori: Record<string, { pertanyaan: string; jawaban: string[]; benar: number }[]> = {
    "pengetahuan-umum": [
    {
      pertanyaan: "Apa itu narkotika?",
      jawaban: ["Zat makanan", "Obat untuk hewan", "Zat yang dapat mempengaruhi fungsi otak", "obat terlarang"],
      benar: 2,
    },
    {
      pertanyaan: "Apa kepanjangan dari NAPZA?",
      jawaban: ["Narkoba, Alkohol, Psikotropika", "Narkotika, Psikotropika, dan Zat Aditif", "Narkotika dan Zat Aktif", "Narkoba, Psikologi, dan Zat Aditif"],
      benar: 1,
    },
    {
      pertanyaan: "Salah satu jenis narkotika yang sering disalahgunakan adalah...",
      jawaban: ["Vitamin", "Paracetamol", "Heroin", "Antibiotik"],
      benar: 2,
    },
    {
      pertanyaan: "Narkotika dapat menyebabkan...",
      jawaban: ["Peningkatan konsentrasi", "Kerusakan otak dan organ tubuh", "Kesehatan prima", "Kekebalan tubuh meningkat"],
      benar: 1,
    },
    {
      pertanyaan: "Jenis narkotika alami adalah...",
      jawaban: ["Ekstasi", "Sabu-sabu", "Ganja", "LSD"],
      benar: 2,
    },
    {
      pertanyaan: "Psikotropika digunakan dalam dunia medis untuk...",
      jawaban: ["Mengobati luka", "Meningkatkan berat badan", "Terapi gangguan mental", "Meningkatkan stamina"],
      benar: 2,
    },
    {
      pertanyaan: "Zat adiktif adalah...",
      jawaban: ["Zat yang menyebabkan ketergantungan", "Zat yang membuat kenyang", "Zat pewarna makanan", "Zat pemanis buatan"],
      benar: 0,
    },
    {
      pertanyaan: "Dampak sosial penyalahgunaan narkoba adalah...",
      jawaban: ["Menjadi lebih rajin", "Hubungan keluarga membaik", "Dijauhi lingkungan", "Menambah teman"],
      benar: 2,
    },
    {
      pertanyaan: "Narkotika mempengaruhi sistem...",
      jawaban: ["Pencernaan", "Peredaran darah", "Syaraf pusat", "Otot"],
      benar: 2,
    },
    {
      pertanyaan: "Penyalahgunaan narkotika bisa menyebabkan...",
      jawaban: ["Kecanduan", "Kesehatan optimal", "Peningkatan prestasi", "Tidur nyenyak"],
      benar: 0,
    },
  ],
  "pencegahan": [
    {
      pertanyaan: "Salah satu cara mencegah narkoba adalah?",
      jawaban: ["Menghindari pergaulan bebas", "Mengikuti geng", "Mengonsumsi alkohol", "Merokok"],
      benar: 0,
    },
    {
      pertanyaan: "Siapa yang bisa membantu pecandu narkoba?",
      jawaban: ["Polisi saja", "Guru saja", "Tenaga medis dan konselor", "Teman sebaya"],
      benar: 2,
    },
    {
      pertanyaan: "Kampanye anti narkoba bertujuan untuk...",
      jawaban: ["Menakuti masyarakat", "Meningkatkan penjualan obat", "Meningkatkan kesadaran bahaya narkoba", "Mengajak mencoba narkoba"],
      benar: 2,
    },
    {
      pertanyaan: "Pendidikan tentang bahaya narkoba sebaiknya dimulai dari...",
      jawaban: ["Usia dewasa", "Remaja", "Anak-anak", "Hanya pecandu"],
      benar: 2,
    },
    {
      pertanyaan: "Berikut ini yang termasuk kegiatan positif untuk pencegahan narkoba adalah...",
      jawaban: ["Balapan liar", "Nongkrong hingga larut malam", "Aktivitas olahraga dan seni", "Mengisolasi diri"],
      benar: 2,
    },
    {
      pertanyaan: "Mengapa penting memiliki lingkungan pertemanan yang baik?",
      jawaban: ["Agar terlihat keren", "Menghindari kesepian", "Mencegah pengaruh buruk termasuk narkoba", "Supaya bisa jadi populer"],
      benar: 2,
    },
    {
      pertanyaan: "Jika ada teman yang menyuruhmu mencoba narkoba, sebaiknya...",
      jawaban: ["Mencoba sedikit", "Menolak dengan tegas", "Mengikuti saja", "Lapor ke guru diam-diam"],
      benar: 1,
    },
    {
      pertanyaan: "Peran keluarga dalam pencegahan narkoba adalah...",
      jawaban: ["Mengabaikan anak", "Membatasi komunikasi", "Memberikan pengawasan dan pendidikan", "Membiarkan anak bebas"],
      benar: 2,
    },
    {
      pertanyaan: "Media sosial dapat digunakan untuk...",
      jawaban: ["Mempromosikan narkoba", "Berjualan ilegal", "Kampanye bahaya narkoba", "Pamer gaya hidup bebas"],
      benar: 2,
    },
    {
      pertanyaan: "Tempat rehabilitasi berfungsi untuk...",
      jawaban: ["Mendidik anak-anak", "Menjaga kebersihan kota", "Membantu pecandu pulih", "Mengurung pecandu selamanya"],
      benar: 2,
    },
  ],
  "hukum": [
    {
      pertanyaan: "UU Narkotika di Indonesia adalah?",
      jawaban: ["UU No. 35 Tahun 2009", "UU No. 5 Tahun 1997", "UU No. 11 Tahun 2008", "UU No. 12 Tahun 2011"],
      benar: 0,
    },
    {
      pertanyaan: "BNN adalah singkatan dari...",
      jawaban: ["Badan Narkotika Nasional", "Badan Nasional Narkoba", "Badan Nasional Narkotika", "Badan Narkoba Nasional"],
      benar: 0,
    },
    {
      pertanyaan: "Sanksi bagi pengedar narkoba bisa berupa...",
      jawaban: ["Peringatan", "Denda ringan", "Penjara atau hukuman mati", "Tidak ada sanksi"],
      benar: 2,
    },
    {
      pertanyaan: "Narkotika golongan I adalah...",
      jawaban: ["Boleh digunakan bebas", "Untuk pengobatan ringan", "Berpotensi tinggi disalahgunakan", "Tidak berbahaya"],
      benar: 2,
    },
    {
      pertanyaan: "Pasal yang mengatur larangan memiliki narkoba untuk diri sendiri terdapat di...",
      jawaban: ["Pasal 111", "Pasal 127", "Pasal 114", "Pasal 132"],
      benar: 1,
    },
    {
      pertanyaan: "Siapa yang berhak menangani rehabilitasi pecandu?",
      jawaban: ["Polisi", "Dokter dan lembaga rehabilitasi", "Guru", "Teman dekat"],
      benar: 1,
    },
    {
      pertanyaan: "Pecandu narkoba bisa mendapatkan hukuman atau...",
      jawaban: ["Dimaafkan begitu saja", "Direhabilitasi", "Dipindah sekolah", "Dibiarkan bebas"],
      benar: 1,
    },
    {
      pertanyaan: "Hukum di Indonesia tentang narkotika bersifat...",
      jawaban: ["Lemah", "Toleran", "Tegas", "Tidak jelas"],
      benar: 2,
    },
    {
      pertanyaan: "UU No. 35 Tahun 2009 menggantikan undang-undang sebelumnya yaitu...",
      jawaban: ["UU No. 22 Tahun 1997", "UU No. 5 Tahun 1999", "UU No. 8 Tahun 1981", "UU No. 20 Tahun 2001"],
      benar: 0,
    },
    {
      pertanyaan: "Siapa yang bisa dikenakan sanksi pidana dalam kasus narkoba?",
      jawaban: ["Hanya pengguna", "Hanya pengedar", "Pengguna, pengedar, dan produsen", "Hanya pembuat hukum"],
      benar: 2,
    },
  ],
};// (Gunakan data soal kamu sebelumnya di sini)
const kategoriNama: Record<string, string> = {
  "pengetahuan-umum": "Pengetahuan Umum Narkotika",
  "pencegahan": "Pencegahan",
  "hukum": "Dasar-dasar Hukum",
};

export default function KuisPage() {
  const { slug } = useParams();
  const router = useRouter();

  const soal = slug ? soalByKategori[slug as string] || [] : [];

  const [index, setIndex] = useState(0);
  const [jawabanUser, setJawabanUser] = useState<(number | null)[]>([]);
  const [selesai, setSelesai] = useState(false);

  // Set jawaban kosong sesuai jumlah soal
  useEffect(() => {
    if (soal.length) {
      setJawabanUser(Array(soal.length).fill(null));
    }
  }, [soal.length]);

  const handleJawaban = (i: number) => {
    const updated = [...jawabanUser];
    updated[index] = i;
    setJawabanUser(updated);
  };

  const lanjut = () => {
    if (index + 1 < soal.length) {
      setIndex(index + 1);
    } else {
      setSelesai(true);
    }
  };

  const kembali = () => {
    if (index > 0) setIndex(index - 1);
    else router.push("/kuis");
  };

  const ulangiKuis = () => {
    setIndex(0);
    setJawabanUser(Array(soal.length).fill(null));
    setSelesai(false);
  };

  const skor: number = jawabanUser.reduce((acc: number, j, i) => {
  return soal[i]?.benar === j ? acc + 1 : acc;
}, 0);

  if (!soal.length) {
    return (
      <main className="p-8 max-w-xl mx-auto">
        <h1 className="text-xl text-red-600 font-semibold">Kategori tidak ditemukan 😢</h1>
        <button onClick={kembali} className="mt-4 underline text-blue-600">
          ⏎ Kembali ke Pemilihan Kategori
        </button>
      </main>
    );
  }

  const currentSoal = soal[index];

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">
          Kategori: {kategoriNama[slug as string] || slug}
        </h1>
        <button
          onClick={() => router.push("/kuis")}
          className="flex items-center gap-2 text-sm bg-gradient-to-r from-emerald-400 to-sky-400 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
        >
          <span>←</span>
          <span>Kembali</span>
        </button>
      </div>

      {!selesai && currentSoal ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                Soal {index + 1} dari {soal.length}
              </span>
              <span className="text-sm text-blue-600 font-medium">
                {kategoriNama[slug as string]}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{
                  width: `${(jawabanUser.filter((j) => j !== null).length / soal.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border">
            <h2 className="text-lg font-bold mb-4 text-gray-800">{currentSoal.pertanyaan}</h2>
            <div className="grid gap-3">
              {currentSoal.jawaban.map((j, i) => {
                const isSelected = jawabanUser[index] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleJawaban(i)}
                    className={`p-3 rounded-lg font-medium text-left shadow-sm transition-all duration-200
                      ${isSelected ? "bg-green-500 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-900"}`}
                  >
                    {j}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={kembali}
              className="text-sm text-blue-600 underline"
              disabled={index === 0}
            >
              ◀ Kembali
            </button>
            <button
              onClick={lanjut}
              disabled={jawabanUser[index] === null}
              className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
                jawabanUser[index] === null
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {index === soal.length - 1 ? "Selesai" : "Selanjutnya ▶"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Kuis Selesai!</h2>
          <p className="mb-6">
            Skor kamu: <strong>{skor} dari {soal.length}</strong>
          </p>

          <div className="space-y-4">
            {soal.map((s, i) => (
              <div key={i} className="p-4 border rounded">
                <p className="font-semibold">{i + 1}. {s.pertanyaan}</p>
                <ul className="mt-2 space-y-1">
                  {s.jawaban.map((opt, j) => {
                    const isUser = j === jawabanUser[i];
                    const isRight = j === s.benar;
                    let cls = "px-3 py-1 rounded";
                    if (isRight) cls += " bg-green-200";
                    else if (isUser) cls += " bg-red-200";
                    else cls += " bg-gray-100";
                    return (
                      <li key={j} className={cls}>
                        {opt} {isUser && !isRight && "(Jawabanmu)"}
                        {isUser && isRight && " ✅"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={ulangiKuis}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🔁 Ulangi Kuis
            </button>
          </div>
        </>
      )}
    </div>
  );
}
