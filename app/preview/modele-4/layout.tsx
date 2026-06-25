import { Inter } from "next/font/google";
import Header from "@/components/model4/Header";
import Footer from "@/components/model4/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

export default function Model4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} bg-black text-white`} style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
