/**
 * Guided chat assistant content. Every answer is built from `site.ts`, so the
 * bot stays in sync when the template is rebranded. Visitors pick from preset
 * questions — no free text, no backend, no AI service.
 *
 * To add a topic: add a node to `nodes` and list its id in `menu` (top level)
 * or in another node's `options`.
 */
import { clinic, faqs, fees, team, treatments } from "@/lib/site";

export type ChatAction = { label: string; href: string; external?: boolean };

export type ChatNode = {
  id: string;
  /** The question as the visitor "asks" it (shown on the choice chip and in their bubble). */
  label: string;
  /** Bot reply, one paragraph per entry. */
  reply: string[];
  actions?: ChatAction[];
  /** Follow-up choices. Omitted → back to the main menu. */
  options?: string[];
};

const whatsappHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Hello ${clinic.name}, I have a question.`,
)}`;

const book: ChatAction = { label: "Book a visit", href: "#book" };
const call: ChatAction = { label: `Call ${clinic.phone}`, href: clinic.phoneHref };
const whatsapp: ChatAction = { label: "WhatsApp us", href: whatsappHref, external: true };

/** Mascot name shown in the chat header and greeting. */
export const assistantName = "Toothy";

export const greeting = [
  `Hi there! I'm ${assistantName}, the ${clinic.short} helper 🦷`,
  "Tap a question below and I'll answer right away.",
];

const list: ChatNode[] = [
  {
    id: "treatments",
    label: "What treatments do you offer?",
    reply: [`We offer ${treatments.length} areas of care. Which would you like to know more about?`],
    options: treatments.map((t) => `treatment-${t.id}`),
  },
  ...treatments.map<ChatNode>((t) => ({
    id: `treatment-${t.id}`,
    label: t.title,
    reply: [t.summary, `Includes: ${t.items.join(", ")}.`],
    actions: [book],
    options: ["fees", "treatments"],
  })),
  {
    id: "fees",
    label: "How much does treatment cost?",
    reply: [
      "Here are indicative fees by category. Your exact cost is confirmed in a written plan before anything begins.",
    ],
    options: fees.map((f) => `fee-${f.id}`),
  },
  ...fees.map<ChatNode>((f) => ({
    id: `fee-${f.id}`,
    label: `${f.title} fees`,
    reply: [...f.items.map((i) => `${i.name} — ₹${i.price}`), ...(f.note ? [f.note] : [])],
    actions: [book],
    options: ["fees"],
  })),
  {
    id: "hours",
    label: "When are you open?",
    reply: clinic.hours.map((h) => `${h.days}: ${h.time}`),
    actions: [call],
  },
  {
    id: "location",
    label: "Where are you located?",
    reply: [`We're in ${clinic.area}.`, clinic.addressLines.join(", ")],
    actions: [{ label: "Get directions", href: clinic.maps, external: true }],
  },
  {
    id: "book",
    label: "How do I book an appointment?",
    reply: [
      "Use the booking form on this page, message us on WhatsApp, or call the front desk — we usually confirm within a few working hours.",
    ],
    actions: [book, whatsapp, call],
  },
  {
    id: "emergency",
    label: "I have a dental emergency",
    reply: [
      `Call our emergency line on ${clinic.emergencyPhone}. We'll fit you in the same day wherever possible.`,
      "For severe swelling, heavy bleeding or difficulty breathing, go to the nearest hospital emergency department.",
    ],
    actions: [{ label: `Call ${clinic.emergencyPhone}`, href: clinic.emergencyPhoneHref }],
  },
  {
    id: "team",
    label: "Who are the dentists?",
    reply: team.map((m) => `${m.name} — ${m.role} (${m.creds})`),
    actions: [{ label: "Meet the team", href: "#team" }],
  },
  {
    id: "faq",
    label: "Other common questions",
    reply: ["Here are the questions we hear most often:"],
    options: faqs.map((_, i) => `faq-${i}`),
  },
  ...faqs.map<ChatNode>((f, i) => ({
    id: `faq-${i}`,
    label: f.q,
    reply: [f.a],
    options: ["faq"],
  })),
  {
    id: "contact",
    label: "Talk to a person",
    reply: [`Our front desk is happy to help. Call ${clinic.phone}, WhatsApp us, or email ${clinic.email}.`],
    actions: [call, whatsapp, { label: "Email us", href: `mailto:${clinic.email}` }],
  },
];

export const nodes: Record<string, ChatNode> = Object.fromEntries(list.map((n) => [n.id, n]));

/** Top-level choices, in order. */
export const menu = ["treatments", "fees", "hours", "location", "book", "emergency", "team", "faq", "contact"];
