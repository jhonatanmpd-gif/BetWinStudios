import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({ subsets:["latin"], variable:"--font-fraunces", weight:["500","600","700"], style:["normal","italic"] });
const inter = Inter({ subsets:["latin"], variable:"--font-inter", weight:["400","500","600","700"] });

export const metadata: Metadata = {
  title: "BETWIN STUDIOS — Jogos e entretenimento",
  description: "Explore o catálogo de jogos, provedores e mesas da BETWIN STUDIOS.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#070A0F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
    <body className="min-h-screen bg-[#070A0F] font-sans antialiased text-white"><Navbar /><main className="min-h-[calc(100vh-76px)]">{children}</main><Footer /></body>
  </html>;
}
