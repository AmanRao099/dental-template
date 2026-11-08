import Image from "next/image";
import Header, { Logo } from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Frame from "@/components/Frame";
import ChatBot from "@/components/ChatBot";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";
import FeeTabs from "@/components/noir/FeeTabs";
import { clinic, faqs, gallery, images, team, testimonials, treatments } from "@/lib/site";
import consultation from "@/assets/images/consultation.jpg";
import waitingRoom from "@/assets/images/waiting-room.jpg";

const wrap = "mx-auto max-w-[1400px] px-5 md:px-10";
const h2 = "font-serif text-[clamp(2.6rem,5.4vw,4.75rem)] font-light leading-[1.02]";
const body = "text-[0.95rem] font-light leading-[1.85] text-ink-dim";

export default function Noir() {
  const [featured] = testimonials;

  return (
    <>
      <Header />
      <main id="main">
        {/* ───────── Hero ───────── */}
        <section id="top" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
          <Image
            src={consultation}
            alt="Dentist in conversation with a patient in a bright treatment room"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="kenburns object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/45 to-paper" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,18,17,0.7)_100%)]" />

          <div className={`relative z-10 ${wrap} flex w-full flex-1 flex-col justify-end pt-28 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-24`}>
            <Reveal>
              <p className="eyebrow mb-6">Dental atelier · {clinic.area}</p>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="max-w-5xl font-serif text-[3.2rem] font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[8.5rem]">
                The art of a <em className="text-sea">beautiful</em> smile
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
                <p className="max-w-md text-base font-light leading-relaxed text-ink/80">
                  Precise, unhurried dentistry by specialists — in a quiet studio designed around your comfort.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="#book" className="bg-ink px-7 py-4 text-center text-[0.7rem] tracking-[0.25em] text-paper uppercase transition-colors duration-500 hover:bg-sea">
                    Book a consultation
                  </a>
                  <a href="#treatments" className="border border-ink/40 px-7 py-4 text-center text-[0.7rem] tracking-[0.25em] uppercase transition-colors duration-500 hover:border-ink">
                    Treatments &amp; fees
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── About ───────── */}
        <section id="about" className={`${wrap} scroll-mt-20 py-28 md:py-40`}>
          <div className="grid gap-16 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow mb-8">Our philosophy</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className={h2}>
                  Dentistry, <em className="text-ink/60">practised as</em> a quiet craft.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <div className={`${body} mt-10 space-y-5`}>
                  <p>
                    Since {clinic.established}, our specialists have worked from a single belief: the best results come from
                    time, precision and honest conversation.
                  </p>
                  <p>
                    Every smile is planned digitally, explained in full and delivered with a light touch — whether it&apos;s
                    a routine clean or a complete restoration.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-12 flex gap-12 border-t border-line pt-8">
                  <div>
                    <p className="font-serif text-4xl font-light">
                      {clinic.rating}
                      <span className="text-sea">★</span>
                    </p>
                    <p className="mt-1 text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">{clinic.reviews} reviews</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl font-light">15</p>
                    <p className="mt-1 text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">Years of practice</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative md:col-span-6 md:col-start-7">
              <Reveal>
                <Frame src={images.hero} alt="Treatment suite bathed in daylight" sizes="(min-width:768px) 45vw, 100vw" className="aspect-[4/5]" imgClassName="transition-transform duration-[2s] hover:scale-105" />
              </Reveal>
              <Reveal delay={250} className="absolute -bottom-12 -left-6 hidden w-[42%] border-8 border-paper md:-left-20 md:block">
                <Frame src={images.instruments} alt="Dental mirror and explorer" sizes="20vw" className="aspect-square" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── Signature treatments ───────── */}
        <section className="bg-paper-2 py-28 md:py-36">
          <div className={wrap}>
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal>
                <p className="eyebrow mb-6">Signature care</p>
                <h2 className={h2}>
                  Considered, <em className="text-sea">never rushed</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <a href="#treatments" className="link-underline text-[0.72rem] tracking-[0.25em] text-ink/80 uppercase">
                  View all fees →
                </a>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {treatments.slice(1, 5).map((t, i) => (
                <Reveal key={t.id} delay={i * 120} className={i % 2 === 1 ? "md:mt-16" : ""}>
                  <figure className="group">
                    <Frame
                      src={t.img}
                      alt={t.alt}
                      sizes="(min-width:768px) 25vw, 50vw"
                      className="aspect-[3/4]"
                      imgClassName="transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                    />
                    <figcaption className="mt-5">
                      <p className="font-serif text-2xl font-light italic">{t.title}</p>
                      <p className="mt-1 text-[0.68rem] tracking-[0.22em] text-ink-dim uppercase">{t.items[0]}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Fees ───────── */}
        <section id="treatments" className={`${wrap} scroll-mt-20 py-28 md:py-40`}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <p className="eyebrow mb-6">Treatments &amp; fees</p>
                  <h2 className={h2}>
                    Clear prices, <em className="text-ink/60">no</em> surprises
                  </h2>
                  <p className={`${body} mt-8 max-w-sm`}>
                    A guide to our most requested treatments. Interest-free payment plans are available for orthodontics and
                    implants.
                  </p>
                  <Frame src={images.scan} alt="Digital dental scan on a tablet" sizes="30vw" className="mt-10 hidden aspect-[4/5] w-full max-w-sm lg:block" />
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={150}>
                <FeeTabs />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── Quote ───────── */}
        <section className="relative flex min-h-[80svh] items-center overflow-hidden">
          <Image src={waitingRoom} alt="" fill placeholder="blur" sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-paper/75" />
          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
            <Reveal>
              <p className="text-sea" aria-label="5 out of 5 stars">★ ★ ★ ★ ★</p>
              <blockquote className="mt-8 font-serif text-4xl leading-[1.2] font-light italic md:text-6xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <p className="mt-8 text-[0.68rem] tracking-[0.3em] text-ink-dim uppercase">
                {featured.name} · {featured.detail}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────── Team ───────── */}
        <section id="team" className={`${wrap} scroll-mt-20 py-28 md:py-40`}>
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <Reveal>
              <p className="eyebrow mb-6">The specialists</p>
              <h2 className={h2}>
                Hands you can <em className="text-sea">trust</em>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className={`${body} max-w-md md:ml-auto`}>
                Four postgraduate specialists, each focused on one discipline — so every part of your care is in expert hands.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 120}>
                <figure className="group">
                  <Frame
                    src={m.img}
                    alt={`Portrait of ${m.name}`}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="aspect-[3/4]"
                    imgClassName="object-top grayscale transition-[filter,transform] duration-[1.2s] group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <figcaption className="mt-5">
                    <p className="font-serif text-2xl">{m.name}</p>
                    <p className="mt-1 text-[0.68rem] tracking-[0.22em] text-sea uppercase">{m.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Studio ───────── */}
        <section id="studio" className="scroll-mt-20 bg-paper-2 py-28 md:py-40">
          <div className={wrap}>
            <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
              <Reveal>
                <p className="eyebrow mb-6">The studio</p>
                <h2 className={h2}>
                  Light, calm <em className="text-sea">and private</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className={`${body} max-w-md md:ml-auto`}>
                  Private suites, natural light and a lounge in place of a waiting room. Take your time — we keep ours unhurried.
                </p>
              </Reveal>
            </div>
            <div className="columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
              {gallery.map((g, i) => (
                <Reveal key={g.alt} delay={(i % 2) * 120} className="break-inside-avoid">
                  <Frame src={g.img} alt={g.alt} sizes="(min-width:640px) 50vw, 100vw" className={i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/2]"} imgClassName="transition-transform duration-[1.6s] ease-out hover:scale-105" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className={`${wrap} scroll-mt-20 py-28 md:py-40`}>
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-6">Before you visit</p>
              <h2 className={h2}>
                Questions, <em className="text-sea">answered</em>
              </h2>
            </Reveal>
            <Reveal delay={150} className="border-t border-line lg:col-span-7 lg:col-start-6">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-[1.5rem] leading-snug transition-colors hover:text-sea md:py-7 md:text-[1.85rem]">
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
        </section>

        {/* ───────── Book ───────── */}
        <section id="book" className="scroll-mt-20 border-y border-line bg-paper-2 py-28 md:py-40">
          <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-6">Reservations</p>
              <h2 className={h2}>
                Begin with a <em className="text-sea">conversation</em>
              </h2>
              <p className={`${body} mt-8 max-w-sm`}>
                Request a consultation and our concierge will confirm a time that suits you.
              </p>
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-[0.68rem] tracking-[0.25em] text-sea uppercase">Urgent care</p>
                <a href={clinic.emergencyPhoneHref} className="link-underline mt-3 inline-block font-serif text-2xl">
                  {clinic.emergencyPhone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-7 lg:col-start-6">
              <BookingForm />
            </Reveal>
          </div>
        </section>

        {/* ───────── Visit ───────── */}
        <section id="visit" className={`${wrap} scroll-mt-20 py-28 md:py-40`}>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-5">
              <Frame src={gallery[0].img} alt="Inside the studio" sizes="(min-width:768px) 40vw, 100vw" className="aspect-[4/5]" />
            </Reveal>
            <div className="flex flex-col md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="eyebrow mb-6">Visit us</p>
                <h2 className={h2}>
                  Find us in <em className="text-sea">{clinic.area.split(",")[0]}</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <dl className="mt-12 grid gap-10 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">Address</dt>
                    <dd className="mt-3 font-serif text-xl leading-snug">
                      {clinic.addressLines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">Hours</dt>
                    {clinic.hours.map((h) => (
                      <dd key={h.days} className="mt-3 font-serif text-xl leading-snug">
                        <span className="block">{h.days}</span>
                        <span className="block text-base text-sea">{h.time}</span>
                      </dd>
                    ))}
                  </div>
                  <div>
                    <dt className="text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">Telephone</dt>
                    <dd className="mt-3 font-serif text-xl">
                      <a href={clinic.phoneHref} className="link-underline">{clinic.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] tracking-[0.25em] text-ink-dim uppercase">Write to us</dt>
                    <dd className="mt-3 font-serif text-xl break-all">
                      <a href={`mailto:${clinic.email}`} className="link-underline">{clinic.email}</a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={250} className="mt-12">
                <div className="relative aspect-[16/10] overflow-hidden border border-line">
                  <iframe
                    title={`Map showing ${clinic.name}`}
                    src={clinic.mapsEmbed}
                    className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.2)]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a href={clinic.maps} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block w-full bg-ink px-7 py-4 text-center text-[0.7rem] tracking-[0.25em] text-paper uppercase transition-colors duration-500 hover:bg-sea sm:w-auto">
                  Get directions
                </a>
              </Reveal>
            </div>
          </div>
        </section>

      </main>

      {/* ───────── Footer ───────── */}
      <footer id="site-footer" className="border-t border-line bg-paper-2">
        <div className={`${wrap} pt-20 pb-10`}>
          <p className="font-serif text-4xl leading-tight font-light md:text-6xl">
            Your smile, <em className="text-sea">thoughtfully kept.</em>
          </p>
          <div className="mt-14 grid gap-10 border-t border-line pt-10 text-sm font-light text-ink-dim sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Logo className="text-ink" />
              <p className="mt-4">{clinic.tagline}.</p>
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] tracking-[0.25em] text-sea uppercase">Visit</p>
              <p>{clinic.address}</p>
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] tracking-[0.25em] text-sea uppercase">Open</p>
              {clinic.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] tracking-[0.25em] text-sea uppercase">Contact</p>
              <a href={clinic.phoneHref} className="link-underline block w-fit py-1 text-ink">{clinic.phone}</a>
              <a href={`mailto:${clinic.email}`} className="link-underline block w-fit py-1 text-ink">{clinic.email}</a>
              <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="link-underline block w-fit py-1 text-ink">Instagram</a>
            </div>
          </div>
          <p className="mt-16 text-[0.65rem] tracking-[0.25em] text-ink/35 uppercase">
            © {new Date().getFullYear()} {clinic.name} · {clinic.area}
          </p>
        </div>
      </footer>

      <MobileBar />
      <ChatBot />
    </>
  );
}
