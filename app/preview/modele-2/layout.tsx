import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/model2/Header";
import Footer from "@/components/model2/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});

export default function Model2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={bricolage.variable}
      style={{
        fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
        backgroundColor: "#FFFCFE",
        color: "#0C0D0D",
        minHeight: "100vh",
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
