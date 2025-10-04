"use client";

import { usePathname } from "next/navigation";
import { UserCircle, Menu, X } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();

  const pageTitles = {
    "/": "📊 Dashboard",
    "/transactions": "💸 Transaksi",
    "/debt": "📑 Utang & Piutang",
    "/education": "📚 Ruang Belajar",
    "/rupy": "🤖 Rupy AI",
  };

  const title = pageTitles[pathname] || "RupiahRapi";

  return (
    <header className="bg-white shadow p-3 md:p-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Hamburger hanya muncul di mobile */}
      <button className="md:hidden text-gray-700" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </button>

      <h2 className="text-gray-700 text-sm md:text-lg font-semibold truncate max-w-[60%] md:max-w-[50%]">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <UserCircle className="text-gray-700 w-6 h-6 md:w-8 md:h-8" />
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm md:text-md font-medium text-gray-700 truncate max-w-[100px]">
            Susan
          </span>
          <span className="text-xs text-orange-600 font-bold flex items-center gap-1">
            ⭐ 120
          </span>
        </div>
      </div>
    </header>
  );
}
