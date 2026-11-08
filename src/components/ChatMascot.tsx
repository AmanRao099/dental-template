/**
 * Toothy — the chat assistant's mascot. Pure SVG with fixed colours so it reads
 * the same on light and dark designs; animations live in globals.css (.chat-*).
 */
export default function ChatMascot({ className = "", sparkle = false }: { className?: string; sparkle?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className}>
      {/* body */}
      <path
        d="M16 15c-.4-6.5 8-9.5 16-5.2 8-4.3 16.4-1.3 16 5.2 1.6 9.6-2.4 15.4-3.2 23.4-1 10.2-3 17.6-6.8 17.6-4 0-3.2-12-6-12s-2 12-6 12c-3.8 0-5.8-7.4-6.8-17.6C18.4 30.4 14.4 24.6 16 15Z"
        fill="#fffdf8"
        stroke="#1b2422"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* shine */}
      <path d="M21 16.5c1-2.6 4-3.6 6.4-2.8" fill="none" stroke="#1b2422" strokeOpacity=".18" strokeWidth="2.2" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="21.5" cy="32" rx="3.4" ry="2.2" fill="#f7a3a8" opacity=".75" />
      <ellipse cx="42.5" cy="32" rx="3.4" ry="2.2" fill="#f7a3a8" opacity=".75" />
      {/* eyes */}
      <g className="chat-blink">
        <ellipse cx="26" cy="26.5" rx="2.5" ry="3.3" fill="#1b2422" />
        <ellipse cx="38" cy="26.5" rx="2.5" ry="3.3" fill="#1b2422" />
        <circle cx="26.9" cy="25.2" r=".9" fill="#fff" />
        <circle cx="38.9" cy="25.2" r=".9" fill="#fff" />
      </g>
      {/* smile */}
      <path d="M28.5 32.5q3.5 3.6 7 0" fill="none" stroke="#1b2422" strokeWidth="2.2" strokeLinecap="round" />
      {sparkle && (
        <path
          className="chat-twinkle"
          d="M53 6l1.4 3.6L58 11l-3.6 1.4L53 16l-1.4-3.6L48 11l3.6-1.4Z"
          fill="#ffd66b"
          stroke="#1b2422"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
