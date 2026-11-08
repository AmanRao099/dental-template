"use client";

import { useEffect, useState } from "react";
import { clinic, nav } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-[1.65rem] leading-none tracking-tight ${className}`}>
      {clinic.short} <em className="text-sea">Dental</em>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid background once scrolled; slide away while scrolling down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open, close on Escape or when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || open ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#top" aria-label={`${clinic.name} — home`} onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="label link-underline text-ink-dim transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a href={clinic.phoneHref} className="label hidden text-ink-dim transition-colors hover:text-ink xl:inline">
              {clinic.phone}
            </a>
            <a
              href="#book"
              className="btn label hidden rounded-full bg-ink px-5 py-3 text-paper hover:bg-sea sm:inline-block"
            >
              Book a visit
            </a>
            <button
              type="button"
              className="relative -mr-2 h-11 w-11 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute left-2.5 right-2.5 h-px bg-ink transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
              <span className={`absolute left-2.5 right-2.5 h-px bg-ink transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the containing block for this fixed overlay. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-paper transition-[opacity,visibility] duration-500 md:top-20 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="flex min-h-full flex-col px-5 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]" aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-5 font-serif text-4xl">
              {n.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="label mt-10 rounded-full bg-ink py-4 text-center text-paper"
          >
            Book a visit
          </a>
          <div className="mt-auto space-y-1 pt-12 text-sm text-ink-dim">
            <p>{clinic.hours[0].days} · {clinic.hours[0].time}</p>
            <a href={clinic.phoneHref} className="link-underline text-ink">{clinic.phone}</a>
          </div>
        </nav>
      </div>
    </>
  );
}
