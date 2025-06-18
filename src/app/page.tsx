"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Slider from "react-slick";


export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-[550px] text-white overflow-hidden">
        {/* Gambar Kiri dan Kanan */}
        <div className="absolute inset-0 flex h-full">
      {/* Kiri: Kepala BNN */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <Image
            src="/images/IMG_20250424_095147.jpg"
            alt="Kepala BNN"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Nama Kepala BNN */}
          <div className="absolute bottom-4 left-4 bg-white/80 text-blue-900 text-sm font-semibold px-4 py-2 rounded shadow">
            KEMBES POL. Ivanto Aritonang, ST – Kepala BNN Kota Manado
          </div>
        </div>

        {/* Kanan: Slider Kegiatan */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <Slider
            {...sliderSettings}
            className="h-full"
          >
            <div className="relative h-[550px]">
              <Image
                src="/images/slide1.jpg"
                alt="Kegiatan 1"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[550px]">
              <Image
                src="/images/slide2.jpg"
                alt="Kegiatan 2"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative h-[550px]">
              <Image
                src="/images/bnn-kawatu.jpg"
                alt="Kegiatan 3"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Slider>
        </div>
      </div>
        {/* Overlay Teks dan Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-20">
          <Image
            src="/images/logo BNN.png"
            alt="Logo BNN"
            width={120}
            height={120}
            className="rounded-full bg-white p-2 mb-6 shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Portal Edukasi BNN
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow-lg">
            Edukasi, pencegahan, dan pemberdayaan masyarakat terhadap bahaya narkoba.
          </p>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Video Edukasi */}
          <Link href="/video" className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-left hover:scale-105 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold text-blue-800">Video Edukasi</h3>
            </div>
            <p className="text-gray-600">Tonton video edukatif mengenai bahaya narkoba, pencegahan, dan kisah inspiratif penyintas.</p>
          </Link>

          {/* Kuis Interaktif */}
          <Link href="/kuis" className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-left hover:scale-105 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold text-yellow-800">Kuis Interaktif</h3>
            </div>
            <p className="text-gray-600">Tes wawasanmu seputar narkoba melalui kuis interaktif yang menyenangkan dan edukatif.</p>
          </Link>
        </div>
      </section>


      {/* Info Call to Action */}
      <section className="bg-yellow-100 py-10 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-2">Butuh Bantuan atau Konsultasi?</h3>
        <p className="mb-4">Masih bingung? Tenang, kamu bisa hubungi tim BNN lewat layanan chat atau konsultasi
          .</p>
        <Link href="/konsultasi">
          <span className="inline-block bg-blue-800 text-white px-5 py-3 rounded-full hover:bg-blue-700 transition">Konsultasi Sekarang</span>
        </Link>
      </section>
      {/* Footer */}
  <footer className="bg-gray-900 text-white py-10 px-6 mt-10">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
    {/* Alamat & GPS */}
    <div>
      <h4 className="text-xl font-semibold mb-2">Alamat Kantor BNN</h4>
      <p>Jl. Balaikota II, Tikala Kumaraka, Kota Manado, Sulawesi Utara</p>
      <p className="mt-2">
        <a 
          href="https://maps.app.goo.gl/wY43XaWeqtUfZQaaA" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 underline hover:text-blue-200"
        >
          Lihat di Google Maps
        </a>
      </p>
    </div>

    {/* Kontak & Sosial Media */}
    <div>
      <h4 className="text-xl font-semibold mb-2">Hubungi Kami</h4>
      <p className="flex items-center gap-2">
        <FaEnvelope className="text-blue-400" />
        <a href="mailto:bnnkota.manado@gmail.com" className="text-blue-400 hover:underline">bnnkota.manado@gmail.com</a>
      </p>
      <p className="flex items-center gap-2 mt-2">
        <FaFacebookF className="text-blue-400" />
        <a href="https://www.facebook.com/profile.php?id=100086996176670" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BNN kota Manado</a>
      </p>
      <p className="flex items-center gap-2 mt-2">
        <FaInstagram className="text-blue-400" />
        <a href="https://www.instagram.com/infobnn_kotamanado?igsh=MTZ6czl4bjFuMnNleg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@infobnn_kotamanado</a>
      </p>
    </div>

  </div>

  <div className="text-center text-sm text-gray-400 mt-8">
    &copy; {new Date().getFullYear()} Badan Narkotika Nasional. All rights reserved.
  </div>
</footer>

    </main>
  );
}
