import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reward")({
  head: () => ({
    meta: [
      { title: "Netflix PAY — Your $200 Reward Is Ready" },
      {
        name: "description",
        content:
          "Congratulations! Your $200 Netflix PAY reward is confirmed. Watch the video to see how to claim it — fictional money, just for fun.",
      },
      { property: "og:title", content: "Netflix PAY — Your $200 Reward Is Ready" },
      {
        property: "og:description",
        content:
          "Congratulations! Your $200 reward is confirmed. Watch the video to claim it — fictional money, just for fun.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Netflix PAY — Your $200 Reward Is Ready" },
      {
        name: "twitter:description",
        content:
          "Congratulations! Your $200 reward is confirmed. Watch the video to claim it — fictional money, just for fun.",
      },
    ],
  }),
  component: RewardPage,
});

/**
 * Paste the video embed URL here when you send it
 * (e.g. "https://www.youtube.com/embed/VIDEO_ID").
 * While it is empty, a placeholder player is shown.
 */
const VIDEO_EMBED_URL = "";
const BALANCE = 200;

const TESTIMONIALS = [
  {
    name: "Thandi M.",
    location: "Cape Town",
    text: "I couldn't believe it at first, but my $200 reward showed up exactly like they promised. Five fun questions and the money was mine — this is the best thing I've tried all year!",
  },
  {
    name: "Jake R.",
    location: "Durban",
    text: "The video explains everything in two minutes. I followed the steps and there it was — my full $200 balance, right on the spot. Wish I had found this sooner!",
  },
  {
    name: "Aisha K.",
    location: "Johannesburg",
    text: "Seriously impressed. Easy quiz, instant reward, no catches. I already told all my friends to watch the video and claim theirs too. Thank you Netflix PAY!",
  },
];

function RewardPage() {
  return (
    <div className="bg-stage flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="font-display text-2xl tracking-wide text-foreground">
          NETFLIX <span className="text-primary text-glow">PAY</span>
        </Link>
        <div className="relative flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Winnings
          </span>
          <span className="font-display text-2xl tracking-wide text-gold">
            ${BALANCE.toLocaleString("en-US")}
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 sm:px-8">
        <section className="anim-fade-up text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Rewards program
          </p>
          <h1 className="font-display mt-3 text-5xl leading-none tracking-wide text-foreground sm:text-7xl">
            CONGRATULATIONS! YOUR <span className="text-gold text-glow-gold">$200</span>{" "}
            REWARD IS CONFIRMED
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Watch the short video below to see how to access your winnings.
          </p>
        </section>

        <section className="anim-pop-in mt-8">
          <VideoPlayer />
        </section>

        <section className="mt-10">
          <h2 className="font-display text-center text-3xl tracking-widest text-foreground">
            WHAT PEOPLE ARE SAYING
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
                <p aria-label="5 out of 5 stars" className="mt-3 text-sm text-gold">
                  ★★★★★
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-6 text-center sm:px-8">
        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Important: this page is a work of fiction made for fun. No real money is
          awarded and "Netflix PAY" is not affiliated with or endorsed by Netflix.
        </p>
      </footer>
    </div>
  );
}

function VideoPlayer() {
  if (VIDEO_EMBED_URL) {
    return (
      <iframe
        src={VIDEO_EMBED_URL}
        title="How to claim your reward"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black"
      />
    );
  }
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-primary-foreground" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <p className="font-display text-xl tracking-widest text-muted-foreground">
        VIDEO COMING SOON
      </p>
      <p className="max-w-xs text-xs text-muted-foreground">
        The reward video will play here once it's added.
      </p>
    </div>
  );
}
