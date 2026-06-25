import { Inter } from "next/font/google";
import Header from "@/components/model3/Header";
import Footer from "@/components/model3/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function Model3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={inter.variable}
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif", backgroundColor: "#fff", color: "#41175E" }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
