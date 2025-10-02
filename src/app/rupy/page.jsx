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

  const handleSend = () => {
    if (!input.trim()) return;

    // Tambahkan pesan user
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    // Reset input
    setInput("");

    // Simulasi respons AI (nanti bisa dihubungkan ke API AI)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Jawaban dari Rupy AI untuk: "${input}" 😊`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-600">Rupy AI</h1>
        <p className="text-gray-600">
          Tanya apa saja tentang keuangan, belajar, atau topik lain ✨
        </p>
      </div>

      {/* Chat box */}
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

        {/* Input area */}
        <div className="flex items-center gap-2 p-4 border-t bg-white">
          <Input
            placeholder="Tulis pertanyaanmu..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Kirim
          </Button>
        </div>
      </Card>
    </div>
  );
}
