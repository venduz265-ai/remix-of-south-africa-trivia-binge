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

const PLAYER_ID = "vid-6ae12f8346271b50ab04fb93";
const PLAYER_SCRIPT =
  "https://scripts.converteai.net/2c9d46a6-300f-4410-a2af-1638345a4d90/players/6ae12f8346271b50ab04fb93/v4/player.js";
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

const VTURB_HTML = `<vturb-smartplayer id="${PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 56.25% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`;

function VideoPlayer() {
  useEffect(() => {
    // Load the VTurb player script once; it finds the <vturb-smartplayer> element.
    if (!document.querySelector('script[data-vturb-player="1"]')) {
      const s = document.createElement("script");
      s.src = PLAYER_SCRIPT;
      s.async = true;
      s.dataset.vturbPlayer = "1";
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-border bg-black"
      dangerouslySetInnerHTML={{ __html: VTURB_HTML }}
    />
  );
}
