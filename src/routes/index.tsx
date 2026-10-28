import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import moneySoundAsset from "@/assets/money-sound.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netflix PAY — South Africa Rewards Quiz" },
      {
        name: "description",
        content:
          "You've been selected for our rewards program! Answer 5 questions about South Africa and win $200 — fictional money, just for fun.",
      },
      { property: "og:title", content: "Netflix PAY — South Africa Rewards Quiz" },
      {
        property: "og:description",
        content:
          "You've been selected for our rewards program! Answer 5 questions and win $200 — fictional money, just for fun.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Netflix PAY — South Africa Rewards Quiz" },
      {
        name: "twitter:description",
        content:
          "You've been selected for our rewards program! Answer 5 questions and win $200 — fictional money, just for fun.",
      },
    ],
  }),
  component: Index,
});

const TOTAL_REWARD = 200;
const QUESTIONS_PER_GAME = 5;
const PRIZE_PER_ANSWER = TOTAL_REWARD / QUESTIONS_PER_GAME;

type Question = {
  q: string;
  options: string[];
  answer: number;
  fact: string;
};

const QUESTIONS: Question[] = [
  {
    q: "Which city is the administrative capital of South Africa?",
    options: ["Cape Town", "Pretoria", "Johannesburg", "Durban"],
    answer: 1,
    fact: "Pretoria hosts the executive government, while Cape Town and Bloemfontein hold the legislative and judicial capitals.",
  },
  {
    q: "On which island was Nelson Mandela imprisoned for 18 years?",
    options: ["Robben Island", "Mauritius", "Zanzibar", "Seal Island"],
    answer: 0,
    fact: "Robben Island, off Cape Town, is now a UNESCO World Heritage Site.",
  },
  {
    q: "What is South Africa's currency called?",
    options: ["Shilling", "Pula", "Rand", "Naira"],
    answer: 2,
    fact: "The rand (ZAR) takes its name from the Witwatersrand, the gold-bearing ridge around Johannesburg.",
  },
  {
    q: "In which year did South Africa hold its first democratic elections?",
    options: ["1990", "1994", "1998", "2001"],
    answer: 1,
    fact: "On 27 April 1994, all adults could vote for the first time — Nelson Mandela became president.",
  },
  {
    q: "Which iconic flat-topped mountain overlooks Cape Town?",
    options: ["Devil's Peak", "Lion's Head", "Table Mountain", "Signal Hill"],
    answer: 2,
    fact: "Table Mountain's plateau stretches about 3 km from side to side.",
  },
];

type Stage = "intro" | "playing" | "done";

function formatMoney(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [coinKey, setCoinKey] = useState(0);
  const coinSound = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const question = QUESTIONS[index]!;

  function start() {
    if (timer.current) clearTimeout(timer.current);
    setIndex(0);
    setSelected(null);
    setTotal(0);
    setCorrectCount(0);
    setStage("playing");
  }

  function answer(choice: number) {
    if (selected !== null) return;
    coinSound.current ??= new Audio(moneySoundAsset.url);
    coinSound.current.currentTime = 0;
    void coinSound.current.play().catch(() => {});
    setSelected(choice);
    setTotal((t) => t + PRIZE_PER_ANSWER);
    setCoinKey((k) => k + 1);
    if (choice === question.answer) setCorrectCount((c) => c + 1);
    timer.current = setTimeout(() => {
      if (index + 1 >= QUESTIONS.length) {
        setStage("done");
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    }, 1900);
  }

  const isCorrect = selected !== null && selected === question.answer;

  return (
    <div className="bg-stage flex min-h-screen flex-col">
      <Header total={total} showBalance={stage !== "intro"} coinKey={coinKey} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-10">
        {stage === "intro" && <Intro onStart={start} />}
        {stage === "playing" && (
          <QuestionCard
            key={index}
            index={index}
            question={question}
            selected={selected}
            isCorrect={isCorrect}
            onAnswer={answer}
          />
        )}
        {stage === "done" && (
          <GameOver
            total={total}
            correctCount={correctCount}
            onRestart={start}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

function Header({
  total,
  showBalance,
  coinKey,
}: {
  total: number;
  showBalance: boolean;
  coinKey: number;
}) {
  return (
    <header className="flex items-center justify-between px-5 py-5 sm:px-8">
      <span className="font-display text-2xl tracking-wide text-foreground">
        NETFLIX <span className="text-primary text-glow">PAY</span>
      </span>
      {showBalance && (
        <div className="relative flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Winnings
          </span>
          <span
            key={coinKey}
            className="anim-coin-pulse font-display text-2xl tracking-wide text-gold"
          >
            {formatMoney(total)}
          </span>
          <span
            key={"float-" + coinKey}
            className="anim-float-up pointer-events-none absolute -top-2 right-3 font-display text-lg text-gold"
          >
            +{formatMoney(PRIZE_PER_ANSWER)}
          </span>
        </div>
      )}
    </header>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="anim-fade-up text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
        Rewards program
      </p>
      <h1 className="font-display mt-3 text-6xl leading-none tracking-wide text-foreground sm:text-8xl">
        NETFLIX <span className="text-primary text-glow">PAY</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base font-medium text-foreground">
        You've been selected to participate in our rewards program!
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Answer {QUESTIONS_PER_GAME} questions about South Africa and win{" "}
        {formatMoney(TOTAL_REWARD)} — right or wrong, the reward is yours.
      </p>
      <button
        onClick={onStart}
        className="mt-9 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 font-display text-2xl tracking-widest text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
      >
        CLAIM YOUR REWARD
      </button>
    </section>
  );
}

function QuestionCard({
  index,
  question,
  selected,
  isCorrect,
  onAnswer,
}: {
  index: number;
  question: Question;
  selected: number | null;
  isCorrect: boolean;
  onAnswer: (choice: number) => void;
}) {
  return (
    <section className="anim-pop-in">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-lg tracking-widest text-muted-foreground">
          QUESTION {index + 1} / {QUESTIONS.length}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary sm:max-w-60">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(index / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
        {question.q}
      </h2>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const revealed = selected !== null;
          const isAnswer = i === question.answer;
          const isChosen = i === selected;
          let cls = "border-border bg-card hover:border-primary hover:bg-accent";
          if (revealed && isAnswer) {
            cls = "border-success bg-success/15 text-success";
          } else if (revealed && isChosen && !isAnswer) {
            cls = "border-primary bg-primary/15 text-primary line-through";
          } else if (revealed) {
            cls = "border-border bg-card opacity-50";
          }
          return (
            <button
              key={option}
              onClick={() => onAnswer(i)}
              disabled={revealed}
              className={`flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300 sm:text-base ${cls}`}
            >
              <span>{option}</span>
              {revealed && isAnswer && <span aria-hidden>✓</span>}
              {revealed && isChosen && !isAnswer && <span aria-hidden>✕</span>}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="anim-fade-up mt-7 flex flex-col items-center gap-2 text-center">
          <span
            className={`font-display text-4xl tracking-widest ${isCorrect ? "text-success" : "text-primary"}`}
          >
            {isCorrect ? "CORRECT!" : "WRONG!"}
          </span>
          <span className="font-display text-2xl tracking-widest text-gold">
            +{formatMoney(PRIZE_PER_ANSWER)} EARNED
          </span>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {question.fact}
          </p>
        </div>
      )}
    </section>
  );
}

function GameOver({
  total,
  correctCount,
  onRestart,
}: {
  total: number;
  correctCount: number;
  onRestart: () => void;
}) {
  return (
    <section className="anim-pop-in text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
        Rewards program
      </p>
      <h1 className="font-display mt-3 text-6xl leading-none tracking-wide text-foreground sm:text-7xl">
        YOU'VE WON
      </h1>
      <p className="font-display text-glow mt-4 text-7xl tracking-wide text-gold sm:text-8xl">
        {formatMoney(total)}
      </p>
      <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
        You answered {correctCount} out of {QUESTIONS.length} correctly — and your{" "}
        {formatMoney(TOTAL_REWARD)} reward is guaranteed. Right or wrong, every
        answer paid.
      </p>
      <Link
        to="/reward"
        className="anim-coin-pulse mt-9 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 font-display text-2xl tracking-widest text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
      >
        CLICK HERE TO CLAIM
      </Link>
      <div className="mt-5">
        <button
          onClick={onRestart}
          className="text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Play again
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pb-3 text-center">
      <p className="text-[10px] tracking-wide text-foreground/20">
        This quiz is a work of fiction. No real money is awarded and it is not
        affiliated with or endorsed by Netflix.
      </p>
    </footer>
  );
}
