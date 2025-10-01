"use client";

import {
  PlusCircle,
  BookOpen,
  Receipt,
  Bot,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const user = {
    name: "Ibu Siti",
    saldoUsaha: 2500000,
    saldoPribadi: 750000,
    points: 120,
  };

  const pemasukan = 1200000;
  const pengeluaran = 950000;
  const profit = pemasukan - pengeluaran;
  const progress = Math.round((profit / pemasukan) * 100);

  const riwayatCatatan = [
    { id: 1, type: "Pemasukan", amount: 200000, date: "27 Sep 2025" },
    { id: 2, type: "Pengeluaran", amount: 75000, date: "26 Sep 2025" },
    { id: 3, type: "Pemasukan", amount: 150000, date: "25 Sep 2025" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm">
        <p className="text-blue-800 font-medium flex items-center gap-2">
          🔔 Utang bahan baku jatuh tempo dalam 2 hari!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saldo Usaha */}
        <div className="bg-gradient-to-r from-[#1290a0] to-[#38b2ac] rounded-2xl shadow-md p-6 flex items-center gap-4 text-white">
          <div className="bg-white/20 p-3 rounded-full">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium opacity-90">Saldo Usaha</h3>
            <p className="text-2xl font-bold mt-1">
              Rp {user.saldoUsaha.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Saldo Pribadi */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl shadow-md p-6 flex items-center gap-4 text-white">
          <div className="bg-white/20 p-3 rounded-full">
            <Receipt className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium opacity-90">Saldo Pribadi</h3>
            <p className="text-2xl font-bold mt-1">
              Rp {user.saldoPribadi.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-600 w-5 h-5" />
          <h2 className="font-semibold text-gray-700 text-lg">
            Profit Usaha Minggu Ini
          </h2>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Pemasukan Usaha</p>
            <p className="text-lg font-bold text-green-600">
              Rp {pemasukan.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pengeluaran Usaha</p>
            <p className="text-lg font-bold text-red-600">
              Rp {pengeluaran.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xl font-bold text-green-700">
          Profit: Rp {profit.toLocaleString("id-ID")} ✅
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-primary" /> Catat Keuangan
          </h2>
          <button
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-md shadow cursor-pointer"
            onClick={() => router.push("/transactions")}
          >
            + Catat Baru
          </button>
        </div>
        <ul className="divide-y divide-gray-100">
          {riwayatCatatan.map((item) => (
            <li
              key={item.id}
              className="flex justify-between py-3 text-sm hover:bg-gray-50 px-2 rounded-md"
            >
              <span className="text-gray-600">
                {item.date} • {item.type}
              </span>
              <span
                className={
                  item.type === "Pemasukan"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                Rp {item.amount.toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Belajar Keuangan
          </h2>
          <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">
            {user.points} Poin
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Kamu sudah kumpulkan <b>{user.points}</b> poin dari belajar. Ayo
          lanjutkan misi hari ini untuk tambah poin dan tukarkan reward!
        </p>
        <button
          className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-md shadow cursor-pointer"
          onClick={() => router.push("/education")}
        >
          🚀 Mulai Belajar
        </button>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6 rounded-2xl shadow-md text-white">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
          🤖Tanya Rupy AI
        </h2>
        <p className="text-sm mb-5">
          Bingung atur keuangan atau usaha? Tanya langsung ke Rupy AI, asisten
          cerdas yang siap membantu kapan saja.
        </p>
        <button
          className="px-5 py-2 bg-white text-pink-500 font-semibold rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          onClick={() => router.push("/rupy")}
        >
          Tanya Sekarang
        </button>
      </div>
    </div>
  );
}
