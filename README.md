# Dental Clinic Template

Production-ready Next.js 15 + Tailwind CSS v4 site for a dental practice, in three designs that share one content file.

| Route | Design | Feel |
|---|---|---|
| `/` | **Studio** | Light, editorial serif, warm off-white + sea green |
| `/modern` | **Modern** | Crisp white, Plus Jakarta Sans, rounded cards, clinical blue |
| `/noir` | **Noir** | Dark, Cormorant serif, champagne accent, fee tabs |

A design switcher sits in the top-right corner (icon chip — opens on hover, tap or keyboard focus) so clients can compare designs.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Customise

- **Content** — name, address, hours, phone, WhatsApp, treatments, fees, team, testimonials, FAQs: `src/lib/site.ts`.
- **Photos** — `src/assets/images/` (static imports → automatic sizing, AVIF/WebP and blur-up placeholders). Replace files keeping the names. Credits/licence: `CREDITS.md`. Social preview: `src/app/opengraph-image.jpg`.
- **Colours** — tokens in `src/app/globals.css` (`:root` for Studio, `[data-theme="modern"]`, `[data-theme="noir"]`).
- **Fonts** — `src/app/layout.tsx` (Studio), `src/app/modern/layout.tsx`, `src/app/noir/layout.tsx`.
- **Booking** — `src/components/BookingForm.tsx` opens WhatsApp with a pre-filled request. Replace `onSubmit` with a `fetch()` to your API/form service for email delivery.

## Shipping one design

Once the client picks a design:

1. Remove `<DesignSwitcher />` from `src/app/layout.tsx`.
2. If the pick is Modern or Noir, move its `page.tsx` to `src/app/page.tsx` and its font + `data-theme` wrapper into the root layout; delete the unused route folders.
3. Update `src/app/sitemap.ts` to list only `/`.

## Mobile

- Sticky Call / Book bar on phones (hides over the booking form and footer).
- 16px form inputs (no iOS zoom), safe-area padding, swipeable gallery, 44px+ tap targets.
- Respects `prefers-reduced-motion`.
