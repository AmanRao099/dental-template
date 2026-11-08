/**
 * All clinic content lives here. Edit this file to rebrand the template —
 * no component changes needed.
 *
 * Images: replace files in src/assets/images (keep the names, or update the
 * imports below). Static imports give Next.js the dimensions and a blur
 * placeholder automatically. Any image set to `null` renders a neutral frame.
 */
import type { StaticImageData } from "next/image";
import hero from "@/assets/images/hero.jpg";
import consultation from "@/assets/images/consultation.jpg";
import instruments from "@/assets/images/instruments.jpg";
import waitingRoom from "@/assets/images/waiting-room.jpg";
import roomBright from "@/assets/images/room-bright.jpg";
import roomOrange from "@/assets/images/room-orange.jpg";
import roomArt from "@/assets/images/room-art.jpg";
import scan from "@/assets/images/scan.jpg";
import tGeneral from "@/assets/images/t-general.jpg";
import tCosmetic from "@/assets/images/t-cosmetic.jpg";
import tOrtho from "@/assets/images/t-ortho.jpg";
import tImplants from "@/assets/images/t-implants.jpg";
import tRestorative from "@/assets/images/t-restorative.jpg";
import tChildren from "@/assets/images/t-children.jpg";
import drAmara from "@/assets/images/dr-amara.jpg";
import drDaniel from "@/assets/images/dr-daniel.jpg";
import drElena from "@/assets/images/dr-elena.jpg";
import drJames from "@/assets/images/dr-james.jpg";

export type Img = StaticImageData | null;

export const clinic = {
  name: "Alder Dental Studio",
  short: "Alder",
  tagline: "Calm, careful dentistry",
  area: "Indiranagar, Bengaluru",
  address: "12, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
  addressLines: ["12, 100 Feet Road", "HAL 2nd Stage, Indiranagar", "Bengaluru 560038"],
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  /** Digits only, with country code — used for WhatsApp booking. */
  whatsapp: "919876543210",
  email: "hello@alderdental.in",
  emergencyPhone: "+91 98765 43211",
  emergencyPhoneHref: "tel:+919876543211",
  hours: [
    { days: "Monday – Friday", time: "9:30 am – 7:30 pm" },
    { days: "Saturday", time: "10:00 am – 5:00 pm" },
    { days: "Sunday", time: "By appointment" },
  ],
  instagram: "https://www.instagram.com/",
  instagramHandle: "@alderdental",
  maps: "https://maps.google.com/?q=Indiranagar,+Bengaluru",
  mapsEmbed: "https://maps.google.com/maps?q=12.9719,77.6412&z=16&output=embed",
  geo: { lat: 12.9719, lng: 77.6412 },
  website: "https://alderdental.in",
  rating: "4.9",
  reviews: "1,200+",
  established: "2011",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#treatments", label: "Treatments" },
  { href: "#studio", label: "Studio" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Visit" },
];

export const images = {
  hero: hero as Img,
  consultation: consultation as Img,
  instruments: instruments as Img,
  scan: scan as Img,
};

/** "The studio" gallery. */
export const gallery: { img: Img; alt: string }[] = [
  { img: roomBright, alt: "Bright treatment room with large windows and white cabinetry" },
  { img: waitingRoom, alt: "Calm waiting area with plants and soft lighting" },
  { img: roomArt, alt: "Treatment chair beside a large painting" },
  { img: roomOrange, alt: "Fully equipped treatment suite" },
];

export const stats = [
  { value: "15", unit: "yrs", label: "In practice" },
  { value: clinic.rating, unit: "★", label: `${clinic.reviews} reviews` },
  { value: "12k", unit: "+", label: "Patients cared for" },
];

export type Treatment = { id: string; title: string; summary: string; items: string[]; img: Img; alt: string };

export const treatments: Treatment[] = [
  {
    id: "general",
    title: "General care",
    summary: "Check-ups, cleaning and the quiet everyday work that keeps teeth healthy for life.",
    items: ["Examinations & digital X-rays", "Scaling & polishing", "Tooth-coloured fillings", "Gum care"],
    img: tGeneral,
    alt: "Dentist examining teeth with a mirror",
  },
  {
    id: "cosmetic",
    title: "Cosmetic",
    summary: "Subtle, natural-looking improvements. We aim for your smile — just brighter, more even.",
    items: ["Professional whitening", "Porcelain veneers", "Composite bonding", "Smile design"],
    img: tCosmetic,
    alt: "Close-up of a bright, natural smile",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    summary: "Straighter teeth with clear aligners or modern braces, planned digitally from day one.",
    items: ["Clear aligners", "Ceramic braces", "Retainers", "Early assessment for children"],
    img: tOrtho,
    alt: "Clear aligners held up beside their case",
  },
  {
    id: "implants",
    title: "Implants",
    summary: "Permanent, stable replacements for missing teeth, placed with guided precision.",
    items: ["Single-tooth implants", "Implant bridges", "All-on-4", "Bone grafting"],
    img: tImplants,
    alt: "Dental implant with crown held in a gloved hand",
  },
  {
    id: "restorative",
    title: "Restorative",
    summary: "Repairing what's worn, cracked or painful — so you can eat and smile without thinking twice.",
    items: ["Root canal treatment", "Crowns & bridges", "Dentures", "Inlays & onlays"],
    img: tRestorative,
    alt: "Dentist reviewing X-ray scans on a light box",
  },
  {
    id: "children",
    title: "Children",
    summary: "Gentle first visits, prevention and patience. Good habits start in a room that feels safe.",
    items: ["First dental visit", "Fissure sealants", "Fluoride care", "Habit counselling"],
    img: tChildren,
    alt: "Smiling child brushing her teeth",
  },
];

export const steps = [
  { title: "Consultation", body: "A relaxed conversation about what's bothering you and what you'd like to change." },
  { title: "Assessment", body: "A thorough examination with low-dose digital X-rays and intraoral photos." },
  { title: "Your plan", body: "Clear options, timelines and costs in writing — before anything begins." },
  { title: "Treatment", body: "Unhurried appointments, with comfort and pain management at every step." },
];

export const team = [
  { name: "Dr. Amara Cole", role: "Founder · Prosthodontist", creds: "BDS, MDS", img: drAmara as Img },
  { name: "Dr. Daniel Reyes", role: "Orthodontist", creds: "BDS, MDS", img: drDaniel as Img },
  { name: "Dr. Elena Novak", role: "Paediatric Dentist", creds: "BDS, MDS", img: drElena as Img },
  { name: "Dr. James Carter", role: "Endodontist", creds: "BDS, MDS", img: drJames as Img },
];

export const testimonials = [
  {
    quote: "I've been anxious about dentists my whole life. This is the first clinic where I didn't dread walking in.",
    name: "Priya S.",
    detail: "Root canal & crown",
  },
  {
    quote: "Everything was explained before it happened — the plan, the cost, the timeline. No surprises at all.",
    name: "Arjun M.",
    detail: "Clear aligners",
  },
  {
    quote: "Our six-year-old actually asks when she gets to go back. That says everything.",
    name: "Nisha & Vikram",
    detail: "Family patients",
  },
];

export const faqs = [
  {
    q: "Do you accept walk-ins?",
    a: "We see patients by appointment so nobody waits long. For dental emergencies, call us and we'll fit you in the same day wherever possible.",
  },
  {
    q: "What does a first visit cost?",
    a: "A consultation with examination is ₹800. If X-rays are needed, we'll tell you the cost before taking them. Your written plan comes at no extra charge.",
  },
  {
    q: "Do you work with dental insurance?",
    a: "Yes. We provide itemised invoices and treatment notes for reimbursement, and work directly with several major insurers. Ask us when you book.",
  },
  {
    q: "Is treatment painful?",
    a: "Most treatments are entirely comfortable with modern local anaesthesia. We go at your pace, and you can pause at any point — just raise a hand.",
  },
  {
    q: "How do you handle sterilisation?",
    a: "Every instrument is cleaned, packed and autoclaved after each use, following international infection-control protocols. Single-use items are never reused.",
  },
];

/** Indicative fees (used by the Noir design's treatment tabs). */
export type Fee = { name: string; desc?: string; price: string };
export const fees: { id: string; title: string; note?: string; items: Fee[] }[] = [
  {
    id: "general",
    title: "General",
    items: [
      { name: "Consultation & examination", desc: "Full check-up with written plan", price: "800" },
      { name: "Digital X-ray (per film)", desc: "Low-dose intraoral imaging", price: "350" },
      { name: "Scaling & polishing", desc: "Professional clean, both arches", price: "1,800" },
      { name: "Tooth-coloured filling", desc: "Composite, per surface", price: "1,500" },
    ],
  },
  {
    id: "cosmetic",
    title: "Cosmetic",
    items: [
      { name: "In-clinic whitening", desc: "Single 90-minute session", price: "12,000" },
      { name: "Composite bonding", desc: "Per tooth", price: "4,500" },
      { name: "Porcelain veneer", desc: "Per tooth, lab-crafted", price: "18,000" },
      { name: "Digital smile design", desc: "Preview before treatment", price: "5,000" },
    ],
  },
  {
    id: "ortho",
    title: "Orthodontics",
    note: "Interest-free monthly plans available",
    items: [
      { name: "Clear aligners", desc: "Full course, includes retainers", price: "1,20,000" },
      { name: "Ceramic braces", desc: "Full course", price: "65,000" },
      { name: "Retainer", desc: "Per arch", price: "6,000" },
    ],
  },
  {
    id: "implants",
    title: "Implants & restorative",
    items: [
      { name: "Single implant with crown", desc: "Guided placement", price: "45,000" },
      { name: "Root canal treatment", desc: "Molar, rotary endodontics", price: "7,500" },
      { name: "Zirconia crown", desc: "Per tooth", price: "14,000" },
      { name: "Complete denture", desc: "Per arch", price: "25,000" },
    ],
  },
];

/** Design variants shown in the design switcher. */
export const designs = [
  { href: "/", name: "Studio", note: "Light · editorial" },
  { href: "/modern", name: "Modern", note: "Crisp · clinical" },
  { href: "/noir", name: "Noir", note: "Dark · premium" },
];
