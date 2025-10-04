"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function RupyAI() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Halo 👋, aku Rupy AI. Apa yang ingin kamu tanyakan?",
    },
  ]);
  const [input, setInput] = useState("");

  const dummyAnswers = {
    "cara catat pengeluaran":
      "Untuk mencatat pengeluaran, pilih kategori 'Pengeluaran', isi jumlah & deskripsi. Catatan akan tersimpan otomatis.",
    "saldo usaha":
      "Saldo usaha dihitung dari pemasukan usaha dikurangi pengeluaran usaha.",
    utang:
      "Untuk mencatat utang, masuk ke menu 'Utang & Piutang', lalu isi jumlah & tanggal jatuh tempo.",
    belajar:
      "Kamu bisa belajar literasi keuangan lewat modul teks, video, dan quiz di menu Belajar Keuangan 📚.",
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    setInput("");

    const lowerInput = text.toLowerCase();
    let reply = "Hmm, maaf aku belum punya jawaban untuk itu. 🤔";

    for (let key in dummyAnswers) {
      if (lowerInput.includes(key)) {
        reply = dummyAnswers[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: reply,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-600">Rupy AI</h1>
        <p className="text-gray-600">
          Tanya apa saja tentang keuangan, belajar, atau topik lain ✨
        </p>
      </div>

      <Card className="w-full h-[500px] flex flex-col rounded-2xl shadow-md">
        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-pink-500 text-white"
                  : "mr-auto bg-white border text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t bg-white space-y-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Tulis pertanyaanmu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              onClick={() => handleSend()}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              Kirim
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSend("Saldo Usaha")}
            >
              Saldo Usaha
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSend("Cara Catat Pengeluaran")}
            >
              Cara Catat Pengeluaran
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSend("Utang")}
            >
              Utang
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSend("Belajar")}
            >
              Belajar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
