import Header, { Logo } from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Frame from "@/components/Frame";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";
import { clinic, faqs, gallery, images, stats, steps, team, testimonials, treatments } from "@/lib/site";

const wrap = "mx-auto max-w-[1400px] px-5 md:px-10";
const h2 = "font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.01em]";
const body = "text-[0.95rem] font-light leading-[1.85] text-ink-dim";
const section = "py-24 md:py-40";

const assurances = ["Sterilised to international standards", "Low-dose digital X-rays", "Written, upfront pricing", "Insurance assistance"];

export default function Home() {
  const [featured, ...more] = testimonials;

  return (
    <>
      <Header />
      <main id="main">
        {/* ───────── Hero ───────── */}
        <section id="top" className={`${wrap} grid items-center gap-12 pt-28 pb-14 md:pt-36 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-20`}>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sea/50 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sea" />
                </span>
                Accepting new patients · {clinic.area}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="max-w-3xl font-serif text-[clamp(3rem,7.2vw,7rem)] leading-[0.96] tracking-[-0.015em]">
                Calm, careful dentistry <em className="text-sea">for every smile.</em>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className={`${body} mt-7 max-w-md md:mt-8 md:text-base`}>
                Modern treatment in an unhurried space. We explain everything first, plan with you, and work gently — from
                a first check-up to a complete smile.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a href="#book" className="btn label rounded-full bg-ink px-7 py-4 text-center text-paper hover:bg-sea">
                  Book a visit
                </a>
                <a href={clinic.phoneHref} className="label link-underline self-center text-ink sm:self-auto">
                  Or call {clinic.phone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-7 md:mt-16 md:pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-[2rem] leading-none md:text-5xl">
                      {s.value}
                      <span className="text-xl text-sea md:text-3xl">{s.unit}</span>
                    </p>
                    <p className="label mt-3 text-[0.6rem] leading-snug text-ink-dim md:text-[0.68rem]">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative lg:col-span-5">
            <Frame
              src={images.hero}
              alt="Bright, calm treatment room with a modern dental chair"
              sizes="(min-width:1024px) 40vw, 100vw"
              priority
              className="aspect-[4/5] rounded-[1.25rem] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl bg-paper/90 px-5 py-4 backdrop-blur-md sm:right-auto sm:bottom-6 sm:left-6">
              <div>
                <p className="font-serif text-2xl leading-none">
                  {clinic.rating} <span className="text-sea">★★★★★</span>
                </p>
                <p className="label mt-2 text-[0.6rem] text-ink-dim">{clinic.reviews} Google reviews</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Assurances ───────── */}
        <div className="border-y border-line bg-paper-2">
          <ul className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-4 py-6 md:grid-cols-4`}>
            {assurances.map((a) => (
              <li key={a} className="label flex items-start gap-3 text-[0.62rem] leading-relaxed text-ink-dim md:items-center md:text-[0.68rem]">
                <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-sea md:mt-0" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* ───────── About ───────── */}
        <section id="about" className={`scroll-mt-20 ${section}`}>
          <div className={`${wrap} flex flex-col items-center text-center`}>
            <Reveal>
              <p className="eyebrow mb-8 md:mb-10">Since {clinic.established}</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-4xl font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.2]">
                We believe good dentistry should feel <em className="text-sea">quiet and certain</em> — clear explanations,
                honest options and gentle hands, in a room designed to put you at ease.
              </p>
            </Reveal>
          </div>

          <div className={`${wrap} mt-16 grid grid-cols-12 gap-3 md:mt-32 md:gap-5`}>
            <Reveal className="col-span-12 md:col-span-7">
              <Frame
                src={images.consultation}
                alt="Dentist talking with a patient before treatment"
                sizes="(min-width:768px) 58vw, 100vw"
                className="aspect-[4/3] rounded-[1.25rem]"
              />
            </Reveal>
            <div className="col-span-12 mt-6 flex flex-col justify-end gap-8 md:col-span-5 md:mt-0 md:gap-10">
              <Reveal delay={150} className="hidden md:block">
                <Frame
                  src={images.instruments}
                  alt="Dental mirror and explorer on a white surface"
                  sizes="40vw"
                  className="aspect-square rounded-[1.25rem]"
                />
              </Reveal>
              <Reveal delay={250}>
                <div className={`${body} max-w-sm space-y-5`}>
                  <p>
                    Our specialists work under one roof, so your care stays joined-up — from routine visits to complex
                    treatment.
                  </p>
                  <p>Every plan is written down with costs and timelines before we begin. No pressure, no surprises.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── Treatments ───────── */}
        <section id="treatments" className={`scroll-mt-20 bg-paper-2 ${section}`}>
          <div className={wrap}>
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <Reveal>
                <p className="eyebrow mb-6">Treatments</p>
                <h2 className={h2}>
                  Everything your smile needs, <em className="text-sea">in one place</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className={`${body} max-w-xs`}>
                  Preventive, cosmetic and specialist care for adults and children, planned around you.
                </p>
              </Reveal>
            </div>

            <ol className="border-t border-line">
              {treatments.map((t, i) => (
                <Reveal as="li" key={t.id} delay={60} className="border-b border-line">
                  <article className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-10">
                    <Frame
                      src={t.img}
                      alt={t.alt}
                      sizes="(min-width:768px) 28vw, 100vw"
                      className="aspect-[16/10] rounded-2xl md:order-last md:col-span-4 md:aspect-[4/3]"
                      imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="flex items-baseline gap-4 md:col-span-4 md:block">
                      <span className="font-serif text-lg text-sea md:mb-3 md:block md:text-xl">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-serif text-[2rem] leading-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-sea md:text-[2.6rem] md:group-hover:translate-x-1.5">
                        {t.title}
                      </h3>
                    </div>
                    <div className="md:col-span-4">
                      <p className={body}>{t.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {t.items.map((it) => (
                          <li key={it} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/80">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Process ───────── */}
        <section className={section}>
          <div className={wrap}>
            <div className="mb-14 grid gap-10 md:mb-24 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-6">
                <p className="eyebrow mb-6">Your first visit</p>
                <h2 className={h2}>
                  Clear steps, <em className="text-sea">at your pace</em>
                </h2>
                <p className={`${body} mt-8 max-w-md`}>
                  Digital scans let us show you exactly what we see — and what we recommend — before a single decision is
                  made.
                </p>
              </Reveal>
              <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
                <Frame
                  src={images.scan}
                  alt="Dentist explaining a 3D dental scan on a tablet"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="aspect-[16/10] rounded-[1.25rem]"
                />
              </Reveal>
            </div>
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 120} className="border-t border-ink pt-7">
                  <p className="label text-sea">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-serif text-3xl">{s.title}</h3>
                  <p className={`${body} mt-3`}>{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Studio ───────── */}
        <section id="studio" className="scroll-mt-20 pb-24 md:pb-40">
          <div className={wrap}>
            <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
              <Reveal>
                <p className="eyebrow mb-6">The studio</p>
                <h2 className={h2}>
                  Light, quiet <em className="text-sea">and spotless</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className={`${body} max-w-md md:ml-auto`}>
                  Private treatment suites, natural light and a waiting room that feels more like a lounge. Every surface is
                  cleaned between patients.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Phones: swipeable row with a peek. Desktop: asymmetric grid. */}
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:mx-auto md:grid md:max-w-[1400px] md:grid-cols-12 md:gap-5 md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden">
            {gallery.map((g, i) => {
              const layout = [
                "md:col-span-7 md:aspect-[4/3]",
                "md:col-span-5 md:aspect-auto md:h-full",
                "md:col-span-5 md:aspect-[4/3]",
                "md:col-span-7 md:aspect-auto md:h-full",
              ][i % 4];
              return (
                <Reveal key={g.alt} delay={(i % 2) * 120} className={`w-[82%] shrink-0 snap-start md:w-auto ${layout.split(" ")[0]}`}>
                  <Frame
                    src={g.img}
                    alt={g.alt}
                    sizes="(min-width:768px) 55vw, 82vw"
                    className={`aspect-[4/5] rounded-[1.25rem] ${layout.split(" ").slice(1).join(" ")}`}
                  />
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ───────── Team ───────── */}
        <section id="team" className={`scroll-mt-20 bg-paper-2 ${section}`}>
          <div className={wrap}>
            <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-2 md:items-end">
              <Reveal>
                <p className="eyebrow mb-6">Our dentists</p>
                <h2 className={h2}>
                  Specialists who <em className="text-sea">take their time</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className={`${body} max-w-md md:ml-auto`}>
                  Each of our dentists holds a postgraduate specialisation and continues training every year — so you are
                  always seen by the right person.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 100} className={i % 2 === 1 ? "lg:mt-16" : ""}>
                  <figure className="group">
                    <Frame
                      src={m.img}
                      alt={`Portrait of ${m.name}`}
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="aspect-[3/4] rounded-[1.25rem]"
                      imgClassName="object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                    <figcaption className="mt-4 md:mt-5">
                      <p className="font-serif text-xl leading-tight md:text-[1.7rem]">{m.name}</p>
                      <p className="label mt-2 text-[0.6rem] leading-relaxed text-ink-dim md:text-[0.68rem]">{m.role}</p>
                      <p className="mt-1 text-sm font-light text-ink-dim">{m.creds}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Testimonials ───────── */}
        <section className={`bg-ink text-paper ${section}`}>
          <div className={wrap}>
            <Reveal className="mx-auto max-w-4xl text-center">
              <p className="label text-sea-soft/80">
                {clinic.rating} ★ · {clinic.reviews} Google reviews
              </p>
              <blockquote className="mt-8 font-serif text-[clamp(1.85rem,4.4vw,3.75rem)] leading-[1.18] md:mt-10">
                <em>&ldquo;{featured.quote}&rdquo;</em>
              </blockquote>
              <p className="label mt-8 text-paper/60 md:mt-10">
                {featured.name} · {featured.detail}
              </p>
            </Reveal>
            <div className="mx-auto mt-16 grid max-w-5xl gap-12 border-t border-paper/15 pt-12 md:mt-20 md:grid-cols-2 md:gap-16 md:pt-14">
              {more.map((t, i) => (
                <Reveal key={t.name} delay={i * 150}>
                  <blockquote className="font-serif text-2xl leading-snug text-paper/90">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="label mt-6 text-paper/50">
                    {t.name} · {t.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className={`${wrap} scroll-mt-20 ${section}`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-32">
                <p className="eyebrow mb-6">Questions</p>
                <h2 className={h2}>
                  Good to <em className="text-sea">know</em>
                </h2>
                <p className={`${body} mt-8 max-w-sm`}>
                  Can&apos;t find what you&apos;re looking for?{" "}
                  <a href={`mailto:${clinic.email}`} className="link-underline text-ink">Write to us</a> — we reply within a
                  day.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={150} className="border-t border-line">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-[1.4rem] leading-snug transition-colors hover:text-sea md:py-7 md:text-[1.75rem]">
                      {f.q}
                      <span className="faq-icon relative h-4 w-4 shrink-0 transition-transform duration-500" aria-hidden>
                        <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                        <span className="absolute top-0 left-1/2 h-full w-px bg-current" />
                      </span>
                    </summary>
                    <p className={`${body} max-w-2xl pb-7`}>{f.a}</p>
                  </details>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── Book ───────── */}
        <section id="book" className={`scroll-mt-20 bg-paper-2 ${section}`}>
          <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-6">Appointments</p>
              <h2 className={h2}>
                Book a <em className="text-sea">visit</em>
              </h2>
              <p className={`${body} mt-8 max-w-sm`}>
                Tell us a little about what you need and when suits you. Our front desk will confirm a time with you
                directly.
              </p>
              <div className="mt-10 border-t border-line pt-8 md:mt-12">
                <p className="label text-sea">Dental emergency?</p>
                <p className="mt-3 font-serif text-2xl">
                  Call <a href={clinic.emergencyPhoneHref} className="link-underline">{clinic.emergencyPhone}</a>
                </p>
                <p className="mt-2 text-sm font-light text-ink-dim">Same-day care for pain, swelling or injury.</p>
              </div>
            </Reveal>
            <Reveal delay={150} className="rounded-[1.25rem] bg-paper p-6 sm:p-10 lg:col-span-7 lg:col-start-6 lg:p-12">
              <BookingForm />
            </Reveal>
          </div>
        </section>

        {/* ───────── Visit ───────── */}
        <section id="visit" className={`${wrap} scroll-mt-20 ${section}`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-6">Visit</p>
                <h2 className={h2}>
                  Find us in <em className="text-sea">{clinic.area.split(",")[0]}</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <dl className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-14">
                  <div>
                    <dt className="label text-ink-dim">Address</dt>
                    <dd className="mt-3 font-serif text-xl leading-snug">
                      {clinic.addressLines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-ink-dim">Hours</dt>
                    {clinic.hours.map((h) => (
                      <dd key={h.days} className="mt-3 font-serif text-xl leading-snug">
                        <span className="block">{h.days}</span>
                        <span className="block text-base text-sea">{h.time}</span>
                      </dd>
                    ))}
                  </div>
                  <div>
                    <dt className="label text-ink-dim">Call</dt>
                    <dd className="mt-3 font-serif text-xl">
                      <a href={clinic.phoneHref} className="link-underline">{clinic.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-ink-dim">Email</dt>
                    <dd className="mt-3 font-serif text-xl break-all">
                      <a href={`mailto:${clinic.email}`} className="link-underline">{clinic.email}</a>
                    </dd>
                  </div>
                </dl>
                <p className="mt-10 text-sm font-light leading-relaxed text-ink-dim">
                  Step-free access · Parking nearby · Card, UPI &amp; insurance accepted
                </p>
                <a
                  href={clinic.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn label mt-10 inline-block w-full rounded-full border border-ink px-7 py-4 text-center hover:bg-ink hover:text-paper sm:w-auto"
                >
                  Get directions
                </a>
              </Reveal>
            </div>
            <Reveal delay={200} className="relative min-h-[340px] overflow-hidden rounded-[1.25rem] border border-line md:min-h-[460px] lg:col-span-6 lg:col-start-7">
              <iframe
                title={`Map showing ${clinic.name}`}
                src={clinic.mapsEmbed}
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_contrast(0.92)_brightness(1.03)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer id="site-footer" className="border-t border-line bg-paper-2">
        <div className={`${wrap} pt-20 pb-10`}>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <p className="max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02]">
              Here when <em className="text-sea">you&apos;re ready.</em>
            </p>
            <a href="#book" className="btn label shrink-0 rounded-full bg-ink px-7 py-4 text-center text-paper hover:bg-sea">
              Book a visit
            </a>
          </div>
          <div className="mt-14 grid gap-10 border-t border-line pt-10 text-sm font-light text-ink-dim sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            <div>
              <Logo className="text-ink" />
              <p className="mt-4 max-w-[16rem]">{clinic.tagline} in {clinic.area}.</p>
            </div>
            <div>
              <p className="label mb-3 text-sea">Visit</p>
              <p className="max-w-[16rem]">{clinic.address}</p>
            </div>
            <div>
              <p className="label mb-3 text-sea">Hours</p>
              {clinic.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
            <div>
              <p className="label mb-3 text-sea">Contact</p>
              <a href={clinic.phoneHref} className="link-underline block w-fit py-1 text-ink">{clinic.phone}</a>
              <a href={`mailto:${clinic.email}`} className="link-underline block w-fit py-1 text-ink">{clinic.email}</a>
              <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="link-underline block w-fit py-1 text-ink">
                Instagram
              </a>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-ink-dim/70 sm:flex-row sm:justify-between md:mt-16">
            <p>
              © {new Date().getFullYear()} {clinic.name}. All rights reserved.
            </p>
            <p>Information on this site is general and not a substitute for a clinical consultation.</p>
          </div>
        </div>
      </footer>

      <MobileBar />
    </>
  );
}
