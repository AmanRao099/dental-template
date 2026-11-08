"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { designs } from "@/lib/site";

/**
 * Top-right design picker for client previews. Collapsed to a small tab;
 * opens on hover (desktop), tap (touch) or keyboard focus.
 * Remove <DesignSwitcher /> from app/layout.tsx once a design is chosen.
 */
export default function DesignSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = designs.find((d) => d.href === pathname) ?? designs[0];

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed top-[4.75rem] right-3 z-[60] font-[family-name:var(--font-body)] md:top-[5.75rem] md:right-5"
      // Hover only for real mice — touch taps are handled by the button's onClick.
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      // Keyboard focus opens it; focus caused by a tap/click does not.
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setOpen(true)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="design-menu"
        aria-label={`Design: ${current.name}. Change design`}
        onClick={(e) => {
          // A mouse click right after hover-open shouldn't immediately close it.
          if ((e.nativeEvent as PointerEvent).pointerType === "mouse") setOpen(true);
          else setOpen((o) => !o);
        }}
        className={`ml-auto flex h-9 items-center rounded-full border border-[#1b2422]/10 bg-white/85 px-2.5 text-[#1b2422] shadow-[0_6px_24px_-10px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 ${
          open ? "gap-2 opacity-100" : "gap-0 opacity-50 hover:opacity-100"
        }`}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
          <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
          <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
          <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
        </svg>
        {/* Label only appears while open, so the collapsed chip stays out of the way */}
        <span
          className={`overflow-hidden text-[0.62rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-[max-width,opacity] duration-500 ${
            open ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {current.name}
        </span>
      </button>

      {/* pt-2 keeps the hover area continuous between the tab and the panel */}
      <div
        id="design-menu"
        className={`absolute right-0 pt-2 transition-[opacity,transform,visibility] duration-300 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <nav
          aria-label="Choose a design"
          className="w-60 overflow-hidden rounded-2xl border border-[#1b2422]/10 bg-white/95 p-1.5 text-[#1b2422] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <p className="px-3 pt-2 pb-1.5 text-[0.58rem] font-semibold tracking-[0.24em] text-[#5b6663] uppercase">Preview a design</p>
          {designs.map((d, i) => {
            const active = d.href === current.href;
            return (
              <Link
                key={d.href}
                href={d.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  active ? "bg-[#1b2422] text-white" : "hover:bg-[#1b2422]/[0.06]"
                }`}
              >
                <span>
                  <span className="block text-sm font-medium">
                    {String(i + 1).padStart(2, "0")} · {d.name}
                  </span>
                  <span className={`block text-xs ${active ? "text-white/60" : "text-[#5b6663]"}`}>{d.note}</span>
                </span>
                {active && (
                  <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
