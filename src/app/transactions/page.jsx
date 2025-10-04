"use client";

import { useState, useEffect } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
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
  const {
    transactions,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    loading,
    error,
  } = useTransactionStore();

  const [jenis, setJenis] = useState("Pemasukan");
  const [kategori, setKategori] = useState("Usaha");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jumlah || Number(jumlah) <= 0) return;

    const newTransaction = {
      kategori,
      jenis,
      keterangan,
      jumlah: Number(jumlah),
      tanggal: new Date().toISOString().split("T")[0],
    };

    await addTransaction(newTransaction);

    toast.success("Transaksi berhasil ditambahkan", {
      description: `${jenis} - Rp ${Number(jumlah).toLocaleString("id-ID")}`,
    });

    // reset form
    setJumlah("");
    setKeterangan("");
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    toast.error("Transaksi dihapus", {
      description: `Transaksi dengan ID ${id} berhasil dihapus`,
    });
  };

  // state filter
  const [filterBulan, setFilterBulan] = useState(
    new Date().toISOString().slice(0, 7)
  );
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
      {/* FORM INPUT */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">Catat Keuangan</h2>

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
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow col-span-2 font-semibold cursor-pointer"
          >
            Simpan
          </button>
        </form>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* RIWAYAT TRANSAKSI */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {" "}
            Riwayat Transaksi
          </h2>

          <div className="flex flex-wrap gap-4 items-end">
            {/* Filter Bulan */}
            <div className="flex flex-col items-start">
              <span className="text-gray-700 font-medium mb-1">Bulan</span>
              <input
                type="month"
                className="border rounded p-2"
                value={filterBulan}
                onChange={(e) => setFilterBulan(e.target.value)}
              />
            </div>

            {/* Filter Jenis */}
            <div className="flex flex-col items-start">
              <span className="text-gray-700 font-medium mb-1">Jenis</span>
              <Select value={filterJenis} onValueChange={setFilterJenis}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Pilih jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                  <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Kategori */}
            <div className="flex flex-col items-start">
              <span className="text-gray-700 font-medium mb-1">Kategori</span>
              <Select value={filterKategori} onValueChange={setFilterKategori}>
                <SelectTrigger className="w-[160px]">
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
        </div>

        {/* Tabel Riwayat */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Tanggal</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
              <TableHead className="text-center w-[100px]">Aksi</TableHead>
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
                  <TableCell className="text-center">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                    >
                      Hapus
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
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
