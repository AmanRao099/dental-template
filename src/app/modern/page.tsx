import Header, { Logo } from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Frame from "@/components/Frame";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";
import { clinic, faqs, gallery, images, steps, team, testimonials, treatments } from "@/lib/site";

const wrap = "mx-auto max-w-[1400px] px-5 md:px-10";
const h2 = "text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]";
const text = "text-[0.95rem] leading-[1.75] text-ink-dim";
const small = "text-[0.8rem] text-ink-dim";

/** Swiss-style section header: index label on the left, heading + intro on the right. */
function SectionHead({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <Reveal className="grid gap-4 border-t border-ink pt-6 md:grid-cols-12 md:gap-10 md:pt-8">
      <p className={`${small} md:col-span-3`}>
        <span className="tabular-nums">({index})</span>&nbsp;&nbsp;{label}
      </p>
      <div className="md:col-span-9">
        <h2 className={`${h2} max-w-3xl`}>{title}</h2>
        {intro && <p className={`${text} mt-5 max-w-xl`}>{intro}</p>}
      </div>
    </Reveal>
  );
}

export default function Modern() {
  const facts = [
    { k: "Since " + clinic.established, v: "Practising in " + clinic.area.split(",")[0] },
    { k: clinic.rating + " / 5", v: clinic.reviews + " Google reviews" },
    { k: "4 specialists", v: "Under one roof" },
    { k: "Same day", v: "Emergency appointments" },
  ];

  // Hero uses the wide room shot; the studio grid gets the rest plus the tall chair photo.
  const studio = [gallery[2], { img: images.hero, alt: "Treatment chair beside a bright window" }, gallery[1], gallery[3]];

  return (
    <>
      <Header />
      <main id="main">
        {/* ───────── Hero ───────── */}
        <section id="top" className={`${wrap} pt-28 md:pt-40`}>
          <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
            <Reveal className="md:col-span-8">
              <h1 className="text-[clamp(2.6rem,6.4vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                Specialist dental care, delivered with precision and calm.
              </h1>
            </Reveal>
            <Reveal delay={150} className="md:col-span-4">
              <p className={text}>
                General, cosmetic and orthodontic treatment in {clinic.area.split(",")[0]}. Clear plans, fixed prices,
                appointments that run on time.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a href="#book" className="btn rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper hover:bg-sea">
                  Book an appointment
                </a>
                <a href={clinic.phoneHref} className="link-underline text-sm font-medium">
                  {clinic.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="mt-12 md:mt-16">
            <Frame
              src={gallery[0].img}
              alt={gallery[0].alt}
              sizes="(min-width:1400px) 1320px, 100vw"
              priority
              className="aspect-[4/3] rounded-xl sm:aspect-[16/9] lg:aspect-[21/9]"
              imgClassName="object-[50%_55%]"
            />
          </Reveal>

          <Reveal delay={150}>
            <dl className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k} className="bg-paper py-6 even:pl-5 md:py-8 md:pl-6 md:first:pl-0">
                  <dt className="text-lg font-medium tracking-tight md:text-xl">{f.k}</dt>
                  <dd className={`${small} mt-1`}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ───────── About ───────── */}
        <section id="about" className={`${wrap} scroll-mt-20 py-24 md:py-36`}>
          <SectionHead index="01" label="Approach" title="Good dentistry is mostly listening, explaining, then doing the work carefully." />
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:col-start-4">
              <Frame
                src={images.consultation}
                alt="Dentist talking with a patient before treatment"
                sizes="(min-width:768px) 50vw, 100vw"
                className="aspect-[4/3] rounded-xl"
              />
            </Reveal>
            <Reveal delay={150} className={`${text} space-y-5 md:col-span-3`}>
              <p>
                Every appointment starts with a conversation. We examine, photograph and scan, then walk you through what we
                see — on screen, in plain language.
              </p>
              <p>You leave with a written plan and fixed costs. Nothing starts until you&apos;re ready.</p>
            </Reveal>
          </div>
        </section>

        {/* ───────── Treatments ───────── */}
        <section id="treatments" className={`${wrap} scroll-mt-20 pb-24 md:pb-36`}>
          <SectionHead
            index="02"
            label="Treatments"
            title="Preventive, cosmetic and specialist care for adults and children."
          />
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-x-8">
            {treatments.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 90}>
                <article className="group">
                  <Frame
                    src={t.img}
                    alt={t.alt}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="aspect-[4/3] rounded-xl"
                    imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <h3 className="text-lg font-medium tracking-tight">{t.title}</h3>
                    <span className={`${small} tabular-nums`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={`${text} mt-4`}>{t.summary}</p>
                  <p className={`${small} mt-3`}>{t.items.join(", ")}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Process ───────── */}
        <section className="bg-paper-2 py-24 md:py-36">
          <div className={wrap}>
            <SectionHead
              index="03"
              label="First visit"
              title="What to expect."
              intro="Your first appointment takes about 45 minutes. There is no obligation to proceed with treatment."
            />
            <div className="mt-12 grid md:mt-16 md:grid-cols-12 md:gap-10">
            <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-9 md:col-start-4 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 90} className="border-t border-line pt-5">
                  <p className={`${small} tabular-nums`}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.body}</p>
                </Reveal>
              ))}
            </ol>
            </div>
          </div>
        </section>

        {/* ───────── Studio ───────── */}
        <section id="studio" className={`${wrap} scroll-mt-20 py-24 md:py-36`}>
          <SectionHead index="04" label="The clinic" title="Four private suites, natural light, no rush." />
          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:gap-6">
            {studio.map((g, i) => (
              <Reveal
                key={g.alt}
                delay={(i % 2) * 120}
                className={["col-span-2 md:col-span-8", "col-span-1 md:col-span-4", "col-span-1 md:col-span-4", "col-span-2 md:col-span-8"][i % 4]}
              >
                <Frame
                  src={g.img}
                  alt={g.alt}
                  sizes="(min-width:768px) 66vw, 100vw"
                  className={`rounded-xl ${i === 0 || i === 3 ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-auto md:h-full"}`}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Team ───────── */}
        <section id="team" className={`${wrap} scroll-mt-20 pb-24 md:pb-36`}>
          <SectionHead
            index="05"
            label="Dentists"
            title="Each of our dentists holds a postgraduate specialisation."
          />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:gap-x-8 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <figure>
                  <Frame
                    src={m.img}
                    alt={`Portrait of ${m.name}`}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="aspect-[4/5] rounded-xl"
                    imgClassName="object-top"
                  />
                  <figcaption className="mt-4">
                    <p className="font-medium tracking-tight">{m.name}</p>
                    <p className={`${small} mt-0.5`}>
                      {m.role} · {m.creds}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Testimonials ───────── */}
        <section className={`${wrap} pb-24 md:pb-36`}>
          <SectionHead index="06" label="Patients" title={`Rated ${clinic.rating} out of 5 across ${clinic.reviews} Google reviews.`} />
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-0">
            <div className="hidden md:col-span-3 md:block" aria-hidden />
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className={`md:col-span-3 ${i > 0 ? "md:border-l md:border-line md:pl-8" : "md:pr-8"} ${i === 1 ? "md:pr-8" : ""}`}>
                <figure>
                  <blockquote className="leading-[1.65] tracking-[-0.01em]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className={`${small} mt-5`}>
                    {t.name} — {t.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className={`${wrap} scroll-mt-20 pb-24 md:pb-36`}>
          <SectionHead index="07" label="Questions" title="Frequently asked." />
          <div className="mt-8 grid md:mt-10 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-9 md:col-start-4">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-medium tracking-tight transition-colors hover:text-sea md:py-6 md:text-lg">
                    {f.q}
                    <span className="faq-icon relative h-3 w-3 shrink-0 transition-transform duration-500" aria-hidden>
                      <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                      <span className="absolute top-0 left-1/2 h-full w-px bg-current" />
                    </span>
                  </summary>
                  <p className={`${text} max-w-2xl pb-6`}>{f.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ───────── Book ───────── */}
        <section id="book" className="scroll-mt-20 bg-paper-2 py-24 md:py-36">
          <div className={wrap}>
            <SectionHead
              index="08"
              label="Appointments"
              title="Request an appointment."
              intro="Our front desk will confirm a time with you, usually within a few working hours."
            />
            <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
              <Reveal className="md:col-span-3">
                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="text-ink-dim">Consultation</dt>
                    <dd className="mt-1 font-medium">₹800, including written plan</dd>
                  </div>
                  <div>
                    <dt className="text-ink-dim">Referral</dt>
                    <dd className="mt-1 font-medium">Not required</dd>
                  </div>
                  <div>
                    <dt className="text-ink-dim">Emergencies</dt>
                    <dd className="mt-1 font-medium">
                      <a href={clinic.emergencyPhoneHref} className="link-underline">{clinic.emergencyPhone}</a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={150} className="md:col-span-9">
                <BookingForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── Visit ───────── */}
        <section id="visit" className={`${wrap} scroll-mt-20 py-24 md:py-36`}>
          <SectionHead index="09" label="Visit" title={clinic.addressLines.join(", ")} />
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <Reveal className="text-sm md:col-span-3">
              <p className="text-ink-dim">Hours</p>
              <ul className="mt-2 space-y-1">
                {clinic.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 md:block">
                    <span>{h.days}</span>
                    <span className="text-ink-dim md:ml-2">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-ink-dim">Contact</p>
              <a href={clinic.phoneHref} className="link-underline mt-2 inline-block">{clinic.phone}</a>
              <br />
              <a href={`mailto:${clinic.email}`} className="link-underline mt-1 inline-block break-all">{clinic.email}</a>
              <p className="mt-6">
                <a href={clinic.maps} target="_blank" rel="noopener noreferrer" className="font-medium text-sea link-underline">
                  Get directions ↗
                </a>
              </p>
            </Reveal>
            <Reveal delay={150} className="relative min-h-[320px] overflow-hidden rounded-xl md:col-span-9 md:min-h-[440px]">
              <iframe
                title={`Map showing ${clinic.name}`}
                src={clinic.mapsEmbed}
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_contrast(0.9)_brightness(1.05)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer id="site-footer" className={`${wrap} pb-10`}>
        <div className="grid gap-8 border-t border-ink pt-8 text-sm md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Logo />
          </div>
          <p className="text-ink-dim md:col-span-3">{clinic.address}</p>
          <div className="md:col-span-3">
            <a href={clinic.phoneHref} className="link-underline">{clinic.phone}</a>
            <br />
            <a href={`mailto:${clinic.email}`} className="link-underline break-all">{clinic.email}</a>
          </div>
          <div className="md:col-span-3">
            <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>
          </div>
        </div>
        <div className={`${small} mt-16 flex flex-col gap-2 sm:flex-row sm:justify-between`}>
          <p>© {new Date().getFullYear()} {clinic.name}</p>
          <p>Information on this site is general and not a substitute for a clinical consultation.</p>
        </div>
      </footer>

      <MobileBar />
    </>
  );
}
