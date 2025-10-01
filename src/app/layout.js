import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RupiahRapi",
  description: "Web App pencatatan keuangan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-gray-50`}
      >
        <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col ml-64">
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
