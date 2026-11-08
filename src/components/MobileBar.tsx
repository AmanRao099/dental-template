"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/site";

/**
 * Thumb-reach Call / Book bar for phones. Appears after the hero,
 * and steps aside while the booking form or footer is on screen.
 */
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ["book", "site-footer"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<Element>();
    let pastHero = false;

    const update = () => setShow(pastHero && visible.size === 0);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.7;
      update();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      update();
    });
    targets.forEach((t) => io.observe(t));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <a href={clinic.phoneHref} className="label flex h-12 items-center justify-center gap-2 rounded-full border border-ink/80 text-ink">
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
          Call
        </a>
        <a href="#book" className="label flex h-12 items-center justify-center rounded-full bg-ink text-paper">
          Book a visit
        </a>
      </div>
    </div>
  );
}
