import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = "https://68de9130d7b591b4b7900188.mockapi.io/transactions";

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      loading: false,
      error: null,

      // 🔹 Ambil data dari MockAPI
      fetchTransactions: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(API_URL);
          set({ transactions: res.data, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      // 🔹 Tambah transaksi baru
      addTransaction: async (newTransaction) => {
        try {
          await axios.post(API_URL, newTransaction);

          // ⏳ Setelah berhasil post, ambil ulang data agar sinkron
          const res = await axios.get(API_URL);
          set({ transactions: res.data });
        } catch (err) {
          set({ error: err.message });
        }
      },

      // 🔹 Hapus transaksi
      deleteTransaction: async (id) => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          // Perbarui state lokal tanpa perlu fetch ulang
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
        } catch (err) {
          set({ error: err.message });
        }
      },
    }),
    {
      name: "transaksi-storage",
      getStorage: () => localStorage,
    }
  )
);
