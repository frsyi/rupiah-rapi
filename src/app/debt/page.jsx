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

export default function UtangPiutang() {
  const [tipe, setTipe] = useState("Utang");
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [status, setStatus] = useState("Belum Lunas");

  const [data, setData] = useState([
    {
      id: 1,
      tipe: "Utang",
      nama: "Budi",
      jumlah: 100000,
      tanggal: "2025-09-25",
      status: "Belum Lunas",
    },
    {
      id: 2,
      tipe: "Piutang",
      nama: "Andi",
      jumlah: 50000,
      tanggal: "2025-09-20",
      status: "Lunas",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !jumlah || Number(jumlah) <= 0) return;
    const newData = {
      id: data.length + 1,
      tipe,
      nama,
      jumlah: Number(jumlah),
      tanggal: new Date().toISOString().split("T")[0],
      status,
    };
    setData([newData, ...data]);
    setNama("");
    setJumlah("");
    setStatus("Belum Lunas");
  };

  // Filter state
  const [filterTipe, setFilterTipe] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // Filter data
  const filteredData = data.filter((d) => {
    const byTipe = filterTipe === "Semua" || d.tipe === filterTipe;
    const byStatus = filterStatus === "Semua" || d.status === filterStatus;
    return byTipe && byStatus;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Catat Utang / Piutang
        </h2>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 mb-6 grid gap-4 md:grid-cols-2"
        >
          <select
            className="border p-2 rounded"
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
          >
            <option value="Utang">Utang</option>
            <option value="Piutang">Piutang</option>
          </select>

          <input
            type="text"
            placeholder="Nama Orang"
            className="border p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <input
            type="number"
            placeholder="Jumlah"
            className="border p-2 rounded"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Belum Lunas">Belum Lunas</option>
            <option value="Lunas">Lunas</option>
          </select>

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
          Riwayat Utang / Piutang
        </h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div>
            <span className="text-gray-700 font-medium mr-2">Tipe:</span>
            <Select value={filterTipe} onValueChange={setFilterTipe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Utang">Utang</SelectItem>
                <SelectItem value="Piutang">Piutang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span className="text-gray-700 font-medium mr-2">Status:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Belum Lunas">Belum Lunas</SelectItem>
                <SelectItem value="Lunas">Lunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabel */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Tanggal</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="text-gray-700">
                    {new Date(d.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={
                      d.tipe === "Utang"
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {d.tipe}
                  </TableCell>
                  <TableCell className="text-gray-700">{d.nama}</TableCell>
                  <TableCell
                    className={
                      d.status === "Lunas"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {d.status}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800">
                    Rp {d.jumlah.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Tidak ada data sesuai filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
