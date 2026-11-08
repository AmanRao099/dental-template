import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { clinic } from "@/lib/site";
import DesignSwitcher from "@/components/DesignSwitcher";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const description = `${clinic.tagline} in ${clinic.area}. General, cosmetic and family dentistry, orthodontics and implants — explained clearly, delivered gently.`;

export const metadata: Metadata = {
  metadataBase: new URL(clinic.website),
  title: `${clinic.name} — Dentist in ${clinic.area}`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: clinic.name,
    locale: "en_IN",
    title: clinic.name,
    description,
  },
  twitter: { card: "summary_large_image", title: clinic.name, description },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
  colorScheme: "light",
};

const dayMap: Record<string, string[]> = {
  "Monday – Friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Saturday: ["Saturday"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: clinic.website,
  telephone: clinic.phone,
  email: clinic.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.addressLines.slice(0, 2).join(", "),
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
  openingHoursSpecification: clinic.hours
    .filter((h) => dayMap[h.days])
    .map((h) => {
      const [opens, closes] = h.time.split("–").map((t) => to24(t.trim()));
      return { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[h.days], opens, closes };
    }),
  sameAs: [clinic.instagram],
};

function to24(t: string) {
  const m = t.match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!m) return t;
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="label fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {children}
        {/* Client preview only — remove once a design is chosen. */}
        <DesignSwitcher />
      </body>
    </html>
  );
}
