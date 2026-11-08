import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { clinic } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-modern",
});

export const metadata: Metadata = {
  title: `${clinic.name} — Modern dentistry in ${clinic.area}`,
  alternates: { canonical: "/modern" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function ModernLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="modern"
      className={`${jakarta.variable} min-h-screen [--font-body:var(--font-modern)] [--font-display:var(--font-modern)]`}
    >
      {children}
    </div>
  );
}
