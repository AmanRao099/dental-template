"use client";

import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/site";
import { assistantName, greeting, menu, nodes, type ChatAction } from "@/lib/chatbot";
import ChatMascot from "@/components/ChatMascot";

type Message = { id: number; from: "bot" | "user"; lines: string[]; actions?: ChatAction[] };

/** Delay before the assistant pops up a greeting, once per browser session. */
const NUDGE_DELAY_MS = 10_000;
const NUDGE_KEY = "chat-nudged";

/**
 * Short two-note chime made with Web Audio (no sound file needed).
 * Browsers block audio until the visitor has clicked, tapped or pressed a key
 * on the page, so on a completely untouched page the chime stays silent.
 */
function playChime() {
  try {
    const Ctx =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctx.resume().catch(() => {});
    const now = ctx.currentTime;
    [880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.13;
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.55);
    });
    setTimeout(() => ctx.close().catch(() => {}), 1200);
  } catch {
    // Audio unavailable — the visual popup still shows.
  }
}

const closeIcon = (
  <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

/**
 * Guided chat assistant shared by every design. It uses the theme tokens
 * (paper / ink / sea / line), so it picks up each design's colours from the
 * surrounding `data-theme` wrapper — render it inside the page, not the root layout.
 * Content lives in `src/lib/chatbot.ts`; the mascot in `ChatMascot.tsx`.
 */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>(menu);
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openRef = useRef(open);
  openRef.current = open;

  const push = (m: Omit<Message, "id">) => setMessages((prev) => [...prev, { ...m, id: nextId.current++ }]);

  const reset = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages([{ id: nextId.current++, from: "bot", lines: greeting }]);
    setOptions(menu);
  };

  // Greet on first open; opening also clears the nudge.
  useEffect(() => {
    if (!open) return;
    setNudge(false);
    if (messages.length === 0) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Proactive greeting: after NUDGE_DELAY_MS, ping once per session unless the chat was already opened.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {}
      if (openRef.current) return;
      setNudge(true);
      playChime();
    }, NUDGE_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Escape closes and returns focus to the launcher.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Phone bottom sheet: stop the page scrolling behind it.
    const sheet = window.matchMedia("(max-width: 767px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (sheet) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (sheet) document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const ask = (id: string) => {
    const node = nodes[id];
    if (!node || typing) return;
    push({ from: "user", lines: [node.label] });
    setOptions([]);
    setTyping(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(
      () => {
        setTyping(false);
        push({ from: "bot", lines: node.reply, actions: node.actions });
        setOptions(node.options ?? menu);
      },
      reduced ? 0 : 650,
    );
  };

  const atMenu = options === menu;
  const avatar = (
    <span className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sea-soft ring-2 ring-paper">
      <ChatMascot className="h-6 w-6" />
    </span>
  );

  return (
    <div className="font-sans">
      {/* Phone backdrop — tap to close */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/*
        Panel
        · phones (< md): bottom sheet, full width (max 32rem), fixed 85% height
        · md and up: floating card above the launcher, fixed size so it never jumps as messages arrive
      */}
      <div
        ref={panelRef}
        id="chat-panel"
        role="dialog"
        aria-modal={open}
        aria-label={`${assistantName}, ${clinic.short} assistant`}
        tabIndex={-1}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 z-[70] mx-auto flex h-[min(85dvh,46rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] border border-b-0 border-line bg-paper text-ink shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.45)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none md:inset-x-auto md:right-6 md:bottom-[6.25rem] md:mx-0 md:h-[min(40rem,calc(100dvh-8.5rem))] md:w-[24rem] md:origin-bottom-right md:rounded-[1.75rem] md:border-b md:shadow-[0_30px_70px_-24px_rgba(0,0,0,0.5)] ${
          open
            ? "visible translate-y-0 opacity-100 md:scale-100"
            : "invisible translate-y-full opacity-100 md:translate-y-4 md:scale-90 md:opacity-0"
        }`}
      >
        {/* Header with scalloped edge */}
        <header className="relative shrink-0 bg-sea px-4 pt-4 pb-6 text-paper">
          {/* sheet grab handle (phones) */}
          <span aria-hidden className="absolute top-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/40 md:hidden" />
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper shadow-inner">
              <ChatMascot className={`h-10 w-10 ${open ? "chat-bob" : ""}`} sparkle />
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-sea bg-[#5ad48a]" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xl leading-tight">{assistantName}</p>
              <p className="truncate text-xs opacity-80">Online · replies instantly</p>
            </div>
            {(!atMenu || messages.length > 1) && (
              <button
                type="button"
                onClick={reset}
                aria-label="Start over"
                title="Start over"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-paper/20"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5v3h3" />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close chat"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-paper/20"
            >
              {closeIcon}
            </button>
          </div>
          <svg aria-hidden viewBox="0 0 368 12" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-3 w-full text-paper">
            <path
              fill="currentColor"
              d="M0 12V6c11.5 0 11.5 6 23 6s11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6 11.5-6 23-6 11.5 6 23 6V12Z"
            />
          </svg>
        </header>

        <div ref={logRef} role="log" aria-live="polite" className="chat-dots flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-4">
          {messages.map((m) => (
            <div key={m.id} className={`chat-pop flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "bot" && avatar}
              <div
                className={`max-w-[82%] rounded-[1.25rem] px-4 py-2.5 text-[0.9rem] leading-relaxed md:text-sm shadow-[0_4px_14px_-8px_rgba(0,0,0,0.25)] ${
                  m.from === "user" ? "rounded-br-sm bg-sea text-paper" : "rounded-bl-sm border border-line bg-paper text-ink"
                }`}
              >
                {m.from === "user" && <span className="sr-only">You: </span>}
                {m.lines.map((l, i) => (
                  <p key={i} className={i ? "mt-1.5" : undefined}>
                    {l}
                  </p>
                ))}
                {m.actions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.actions.map((a) => (
                      <a
                        key={a.href}
                        href={a.href}
                        {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={() => a.href.startsWith("#") && setOpen(false)}
                        className="btn inline-flex min-h-9 items-center gap-1 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-paper hover:bg-sea"
                      >
                        {a.label}
                        <span aria-hidden>→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="chat-pop flex items-end gap-2" aria-label={`${assistantName} is typing`}>
              {avatar}
              <div className="flex gap-1 rounded-[1.25rem] rounded-bl-sm border border-line bg-paper px-4 py-3.5">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-sea" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Choices */}
        <div className="shrink-0 border-t border-line bg-paper-2 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <p className="px-1 pb-2 text-[0.65rem] font-semibold tracking-[0.18em] text-ink-dim uppercase">
            {typing ? `${assistantName} is thinking…` : "Choose a question"}
          </p>
          <div className="flex max-h-[min(11rem,30dvh)] flex-wrap gap-2 overflow-y-auto overscroll-contain pb-0.5">
            {options.map((id, i) => (
              <button
                key={id}
                type="button"
                onClick={() => ask(id)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="chat-pop min-h-10 rounded-full border-2 border-sea/30 bg-paper px-3.5 py-2 text-left text-[0.8rem] font-medium md:min-h-0 md:py-1.5 md:text-xs text-ink transition-[transform,background-color,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-sea hover:bg-sea hover:text-paper active:scale-95"
              >
                {nodes[id]?.label}
              </button>
            ))}
            {!typing && !atMenu && (
              <button
                type="button"
                onClick={() => setOptions(menu)}
                className="chat-pop min-h-10 rounded-full border-2 border-dashed border-line px-3.5 py-2 text-[0.8rem] font-medium md:min-h-0 md:py-1.5 md:text-xs text-ink-dim transition-colors hover:border-ink hover:text-ink"
              >
                ← Main menu
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Proactive greeting popup */}
      <div
        role="status"
        aria-live="polite"
        inert={!nudge}
        className={`chat-nudge fixed right-4 z-50 w-[min(16rem,calc(100vw-2rem))] origin-bottom-right md:right-6 ${
          nudge ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-75 opacity-0"
        }`}
      >
        {nudge && (
          <div className="relative rounded-[1.4rem] rounded-br-sm border border-line bg-paper text-ink shadow-[0_22px_50px_-20px_rgba(0,0,0,0.5)]">
            <button type="button" onClick={() => setOpen(true)} className="flex w-full items-center gap-3 py-3 pr-10 pl-3 text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sea-soft">
                <ChatMascot className="chat-wiggle h-9 w-9" />
              </span>
              <span>
                <span className="block text-[0.7rem] font-semibold tracking-wide text-sea">{assistantName}</span>
                <span className="block text-sm font-medium leading-snug">Hi 👋 Any help needed?</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setNudge(false)}
              aria-label="Dismiss message"
              className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-ink/[0.06] hover:text-ink"
            >
              {closeIcon}
            </button>
          </div>
        )}
      </div>

      {/* Launcher — sits above the phone Call/Book bar */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : `Chat with ${assistantName}`}
        className={`chat-launcher group fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sea text-paper shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55)] ring-[3px] ring-paper hover:scale-105 active:scale-95 md:right-6 md:h-16 md:w-16 md:ring-4 ${
          open ? "max-md:invisible max-md:scale-50 max-md:opacity-0" : ""
        }`}
      >
        {nudge && (
          <span className="absolute top-0 right-0 flex h-4 w-4" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7a3a8] motion-reduce:animate-none" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-paper bg-[#e8616b] text-[0.55rem] font-bold text-white">
              1
            </span>
          </span>
        )}
        {open ? (
          <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">{closeIcon}</span>
        ) : (
          <ChatMascot className={`h-10 w-10 md:h-11 md:w-11 ${nudge ? "chat-wiggle" : "chat-bob"} group-hover:[animation:chat-wiggle_0.8s_ease-in-out]`} />
        )}
      </button>
    </div>
  );
}
