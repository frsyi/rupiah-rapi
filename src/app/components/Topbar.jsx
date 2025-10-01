"use client";

import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

export default function Topbar() {
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
    <header className="bg-white shadow p-4 px-8 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-gray-700 text-lg font-semibold truncate max-w-[50%]">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <UserCircle className="text-gray-700 w-8 h-8" />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-md font-medium text-gray-700 truncate max-w-[100px]">
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

// "use client";

// import { usePathname } from "next/navigation";
// import { UserCircle } from "lucide-react";

// export default function Topbar() {
//   const pathname = usePathname();

//   const pageTitles = {
//     "/": "📊 Dashboard",
//     "/transactions": "💸 Transaksi",
//     "/debt": "📑 Utang & Piutang",
//     "/education": "📚 Ruang Belajar",
//     "/rupy": "🤖 Rupy AI",
//   };

//   const title = pageTitles[pathname] || "RupiahRapi";

//   return (
//     <header className="bg-white shadow p-4 px-8 flex items-center justify-between sticky top-0 z-10">
//       <h2 className="text-gray-700 text-lg font-semibold">{title}</h2>
//       <div className="flex items-center gap-2">
//         <UserCircle className="w-6 h-6 text-gray-700" />
//         <span className="text-gray-700">Susan</span>
//       </div>
//     </header>
//   );
// }
