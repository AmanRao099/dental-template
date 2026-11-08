"use client";

import { useEffect, useState, type FormEvent } from "react";
import { clinic, treatments } from "@/lib/site";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-dim/50 transition-colors focus:border-sea focus:outline-none focus:ring-0 rounded-none";
const select = "select-chevron cursor-pointer appearance-none pr-6";

/**
 * Appointment request. No backend required: on submit it opens WhatsApp with a
 * pre-filled message to the clinic. Swap `onSubmit` for a fetch() to your own
 * API or form service if you prefer email/CRM delivery.
 */
export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  // Set on the client only, so server and client markup match.
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Hello ${clinic.name}, I'd like to request an appointment.`,
      "",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Reason: ${f.get("reason")}`,
      f.get("date") ? `Preferred date: ${f.get("date")}` : "",
      `Preferred time: ${f.get("time")}`,
      f.get("notes") ? `Notes: ${f.get("notes")}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="animate-[fadein_.7s_ease_forwards] border-t border-line pt-10" role="status">
        <p className="font-serif text-4xl leading-tight">
          Thank you. <em className="text-sea">We&apos;ll be in touch.</em>
        </p>
        <p className="mt-5 max-w-md text-[0.95rem] leading-[1.8] text-ink-dim">
          Your request has opened in WhatsApp — press send there and our front desk will confirm a time, usually
          within a few working hours. Prefer to talk? Call{" "}
          <a href={clinic.phoneHref} className="link-underline text-ink">{clinic.phone}</a>.
        </p>
        <button type="button" onClick={() => setSent(false)} className="label link-underline mt-8 text-ink">
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <label className="block">
        <span className="label text-ink-dim">Full name</span>
        <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="block">
        <span className="label text-ink-dim">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+\s\-]{8,}"
          placeholder="+91"
          className={field}
        />
      </label>
      <label className="block">
        <span className="label text-ink-dim">Reason for visit</span>
        <select name="reason" required defaultValue="" className={`${field} ${select}`}>
          <option value="" disabled>Select one</option>
          <option>Check-up & cleaning</option>
          {treatments.map((t) => (
            <option key={t.id}>{t.title}</option>
          ))}
          <option>Tooth pain / emergency</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="label text-ink-dim">Date</span>
          <input name="date" type="date" min={minDate} className={field} />
        </label>
        <label className="block">
          <span className="label text-ink-dim">Time</span>
          <select name="time" defaultValue="Any time" className={`${field} ${select}`}>
            <option>Any time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>
      <label className="block sm:col-span-2">
        <span className="label text-ink-dim">Anything we should know? (optional)</span>
        <textarea name="notes" rows={3} placeholder="Symptoms, concerns, or questions" className={`${field} resize-none`} />
      </label>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-dim">
          Requests open in WhatsApp. We only use your details to arrange your appointment.
        </p>
        <button type="submit" className="btn label w-full shrink-0 rounded-full sm:w-auto bg-ink px-8 py-4 text-paper hover:bg-sea">
          Request appointment
        </button>
      </div>
    </form>
  );
}
