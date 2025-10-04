"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function BelajarKeuangan() {
  const materiAwal = [
    {
      id: 1,
      judul: "Mengatur Pemasukan & Pengeluaran",
      deskripsi:
        "Belajar cara mencatat pemasukan dan pengeluaran agar lebih teratur.",
      gambar: "/images/education/1.jpg",
      status: "belum",
      link: "https://mediakeuangan.kemenkeu.go.id/article/show/7-tips-mengatur-keuangan-agar-tabunganmu-terus-bertambah",
    },
    {
      id: 2,
      judul: "Pentingnya Dana Darurat",
      deskripsi:
        "Kenapa dana darurat itu penting untuk menghadapi keadaan tak terduga.",
      gambar: "/images/education/2.jpg",
      status: "belum",
      link: "https://mediakeuangan.kemenkeu.go.id/article/show/dana-darurat-apakah-penting",
    },
    {
      id: 3,
      judul: "Cara Menabung dengan Konsisten",
      deskripsi: "Tips supaya bisa menabung dengan teratur tanpa terasa berat.",
      gambar: "/images/education/3.jpg",
      status: "belum",
      link: "https://pina.id/artikel/detail/10-tips-jitu-agar-kamu-bisa-konsisten-menabung-p6irxvrc4a7",
    },
    {
      id: 4,
      judul: "Investasi Dasar untuk Pemula",
      deskripsi: "Dasar-dasar investasi yang perlu diketahui pemula.",
      gambar: "/images/education/4.jpg",
      status: "belum",
      link: "https://banksaqu.co.id/blog/8-jenis-investasi-untuk-pemula",
    },
    {
      id: 5,
      judul: "Menghindari Hutang Konsumtif",
      deskripsi:
        "Cara mengendalikan keuangan agar tidak terjebak hutang konsumtif.",
      gambar: "/images/education/5.jpg",
      status: "belum",
      link: "https://www.treasury.id/hati-hati-bahaya-utang-konsumtif-dan-cara-jitu-menghindarinya",
    },
  ];

  const [materi, setMateri] = useState(materiAwal);
  const [poin, setPoin] = useState(0);

  const handleSelesai = (id) => {
    setMateri((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "selesai" } : m))
    );

    const item = materi.find((m) => m.id === id);
    if (item && item.status !== "selesai") {
      setPoin((prev) => prev + 10);
    }
  };

  const totalMateri = materi.length;
  const selesaiCount = materi.filter((m) => m.status === "selesai").length;
  const progress = Math.round((selesaiCount / totalMateri) * 100);

  return (
    <div className=" space-y-10">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-2xl shadow-md text-white">
        <h1 className="text-3xl font-bold">📚 Belajar Keuangan</h1>
        <p className="mt-2 text-pink-100">
          Baca materi, kumpulkan poin, dan tingkatkan pengetahuanmu tentang
          keuangan pribadi.
        </p>

        <div className="flex items-center justify-between mt-6">
          <span className="text-xl font-bold">Poin: {poin}</span>
          <span className="text-pink-50">
            {selesaiCount}/{totalMateri} Materi Selesai
          </span>
        </div>

        <Progress value={progress} className="mt-3 h-3 bg-pink-200" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {materi.map((m) => (
          <div
            key={m.id}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <div className="relative w-full h-48">
              <Image
                src={m.gambar}
                alt={m.judul}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {m.judul}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {m.deskripsi}
              </p>

              <div className="flex items-center justify-between">
                <Link
                  href={m.link}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg px-4 py-2"
                    onClick={() => handleSelesai(m.id)}
                  >
                    {m.status === "belum"
                      ? "Mulai Baca"
                      : m.status === "proses"
                      ? "Tandai Selesai"
                      : "Baca Ulang"}
                  </Button>
                </Link>

                <span
                  className={`text-sm font-medium ${
                    m.status === "selesai"
                      ? "text-green-600"
                      : m.status === "proses"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {m.status === "selesai"
                    ? "✅ Selesai"
                    : m.status === "proses"
                    ? "📖 Sedang Dibaca"
                    : "⏳ Belum Dibaca"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
