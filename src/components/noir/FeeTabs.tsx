"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { fees } from "@/lib/site";

export default function FeeTabs() {
  const [active, setActive] = useState(fees[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const section = fees.find((f) => f.id === active)!;

  const select = (index: number, focus = false) => {
    setActive(fees[index].id);
    const tab = tabRefs.current[index];
    if (!tab) return;
    if (focus) tab.focus();
    tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  // WAI-ARIA tabs: arrow keys, Home, End.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = fees.findIndex((f) => f.id === active);
    const last = fees.length - 1;
    const next =
      e.key === "ArrowRight" ? (current === last ? 0 : current + 1)
      : e.key === "ArrowLeft" ? (current === 0 ? last : current - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Treatment fees"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-x-8 overflow-x-auto border-b border-line px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {fees.map((f, i) => {
          const selected = f.id === active;
          return (
            <button
              key={f.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${f.id}`}
              aria-selected={selected}
              aria-controls={`panel-${f.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`relative shrink-0 whitespace-nowrap pt-1 pb-5 font-serif text-2xl font-light transition-colors duration-500 md:text-3xl ${
                selected ? "italic text-ink" : "text-ink/40 hover:text-ink/75"
              }`}
            >
              {f.title}
              <span className={`absolute bottom-0 left-0 h-px bg-sea transition-all duration-700 ${selected ? "w-full" : "w-0"}`} />
            </button>
          );
        })}
      </div>

      {section.note && <p className="mt-6 text-xs tracking-[0.2em] text-sea/80 uppercase">{section.note}</p>}

      <ul key={section.id} id={`panel-${section.id}`} role="tabpanel" aria-labelledby={`tab-${section.id}`} tabIndex={0} className="mt-4">
        {section.items.map((item, i) => (
          <li
            key={item.name}
            className="animate-[fadein_.7s_ease_forwards] border-b border-line py-6 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-baseline gap-4">
              <h4 className="min-w-0 font-serif text-xl md:text-[1.45rem]">{item.name}</h4>
              <span className="mb-1 min-w-4 flex-1 border-b border-dotted border-ink/20" aria-hidden />
              <span className="shrink-0 font-serif text-lg text-sea">
                <span className="mr-1 text-xs tracking-[0.15em] text-ink-dim uppercase">from</span>₹{item.price}
              </span>
            </div>
            {item.desc && <p className="mt-1.5 text-sm font-light leading-relaxed text-ink-dim">{item.desc}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs leading-relaxed text-ink-dim">
        Indicative starting fees, inclusive of GST. Your exact cost is confirmed in writing after consultation.
      </p>
    </div>
  );
}
