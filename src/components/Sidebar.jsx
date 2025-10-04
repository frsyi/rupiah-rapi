"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt, Wallet, Bot, BookOpen } from "lucide-react";

const menus = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Transaksi", path: "/transactions", icon: Receipt },
  { name: "Utang & Piutang", path: "/debt", icon: Wallet },
  { name: "Ruang Belajar", path: "/education", icon: BookOpen },
  { name: "Rupy AI", path: "/rupy", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-6 h-full w-full">
      <h1 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8 text-center flex items-center justify-center gap-1">
        <img
          src="/images/logo/logo.png"
          alt="RupiahRapi Logo"
          className="w-6 h-6 object-contain"
        />
        <span className="hidden sm:inline">RupiahRapi</span>
      </h1>
      <nav className="flex flex-col space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition ${
                pathname === menu.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {menu.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
