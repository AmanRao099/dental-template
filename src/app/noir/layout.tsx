import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { clinic } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-noir",
});

export const metadata: Metadata = {
  title: `${clinic.name} — The art of a beautiful smile`,
  alternates: { canonical: "/noir" },
};

export const viewport: Viewport = { themeColor: "#0e1211", colorScheme: "dark" };

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="noir" className={`${cormorant.variable} min-h-screen [--font-display:var(--font-noir)]`}>
      {children}
    </div>
  );
}
