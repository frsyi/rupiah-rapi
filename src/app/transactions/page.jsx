"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Transaksi() {
  const [jenis, setJenis] = useState("Pemasukan");
  const [kategori, setKategori] = useState("Usaha");
  const [keterangan, setKeterangan] = useState("Keterangan");
  const [jumlah, setJumlah] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      kategori: "Usaha",
      jenis: "Pemasukan",
      jumlah: 50000,
      tanggal: "2025-09-27",
    },
    {
      id: 2,
      kategori: "Pribadi",
      jenis: "Pengeluaran",
      jumlah: 20000,
      tanggal: "2025-09-27",
    },
    {
      id: 3,
      kategori: "Usaha",
      jenis: "Pemasukan",
      jumlah: 150000,
      tanggal: "2025-09-26",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jumlah || Number(jumlah) <= 0) return;
    const newTransaction = {
      id: transactions.length + 1,
      kategori,
      jenis,
      jumlah: Number(jumlah),
      tanggal: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
    setJumlah("");
  };

  // state filter
  const [filterBulan, setFilterBulan] = useState("2025-09");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [filterKategori, setFilterKategori] = useState("Semua");

  // filter data
  const filteredTransactions = transactions.filter((t) => {
    const byBulan = t.tanggal.startsWith(filterBulan);
    const byJenis = filterJenis === "Semua" || t.jenis === filterJenis;
    const byKategori =
      filterKategori === "Semua" || t.kategori === filterKategori;
    return byBulan && byJenis && byKategori;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">Catat Keuangan</h2>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 mb-6 grid gap-4 md:grid-cols-2"
        >
          <select
            className="border p-2 rounded"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>
          <select
            className="border p-2 rounded"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="Usaha">Usaha</option>
            <option value="Pribadi">Pribadi</option>
          </select>
          <input
            type="number"
            placeholder="Jumlah"
            className="border p-2 rounded col-span-2"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
          />
          <input
            type="text"
            placeholder="Keterangan"
            className="border p-2 rounded col-span-2"
            // value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow col-span-2 font-semibold cursor-pointer"
          >
            Simpan
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Riwayat Transaksi
        </h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div>
            <span className="text-gray-700 font-medium mr-2">Bulan:</span>
            <Select value={filterBulan} onValueChange={setFilterBulan}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-09">September 2025</SelectItem>
                <SelectItem value="2025-08">Agustus 2025</SelectItem>
                <SelectItem value="2025-07">Juli 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span className="text-gray-700 font-medium mr-2">Jenis:</span>
            <Select value={filterJenis} onValueChange={setFilterJenis}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span className="text-gray-700 font-medium mr-2">Kategori:</span>
            <Select value={filterKategori} onValueChange={setFilterKategori}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Usaha">Usaha</SelectItem>
                <SelectItem value="Pribadi">Pribadi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabel Riwayat */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Tanggal</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium text-gray-700">
                    {new Date(t.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={
                      t.jenis === "Pemasukan"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {t.jenis}
                  </TableCell>
                  <TableCell className="text-gray-700">{t.kategori}</TableCell>
                  <TableCell className="text-right font-semibold text-gray-800">
                    Rp {t.jumlah.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  Tidak ada transaksi sesuai filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
