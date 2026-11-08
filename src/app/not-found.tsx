import Link from "next/link";
import { clinic } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 md:px-10">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.98]">
        This page <em className="text-sea">isn&apos;t here.</em>
      </h1>
      <p className="mt-8 max-w-md text-[0.95rem] font-light leading-[1.85] text-ink-dim">
        It may have moved. Head back to the homepage, or call us on{" "}
        <a href={clinic.phoneHref} className="link-underline text-ink">{clinic.phone}</a>.
      </p>
      <Link href="/" className="btn label mt-10 w-fit rounded-full bg-ink px-7 py-4 text-paper hover:bg-sea">
        Back to home
      </Link>
    </main>
  );
}
