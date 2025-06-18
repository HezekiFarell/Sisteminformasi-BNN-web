'use client';
import { useState } from 'react';
import { QrCode, ArrowLeftCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LaporPage() {
  const [showBarcode, setShowBarcode] = useState(false);
  const router = useRouter();

  const handleScanClick = () => {
    setShowBarcode(true);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Scan Barcode Pelaporan</h1>
        <p className="text-gray-600 mb-6">
          Klik tombol di bawah untuk menampilkan barcode pelaporan.
        </p>

        {!showBarcode ? (
          <button
            onClick={handleScanClick}
            className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition duration-300 mb-4"
          >
            <QrCode className="w-6 h-6" />
            Tampilkan Barcode
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src="/images/barcode.jpg"
              alt="Barcode Pelaporan"
              width={250}
              height={250}
              className="rounded-lg shadow-md mb-4"
            />
            <p className="text-green-700 font-medium mb-4">
              Silakan scan barcode untuk melanjutkan pelaporan.
            </p>
          </div>
        )}

        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Kembali ke Beranda
        </button>
      </div>
    </main>
  );
}
