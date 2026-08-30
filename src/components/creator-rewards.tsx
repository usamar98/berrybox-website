import { ArrowUpRight, Boxes, Layers3, Rocket, Trophy } from "lucide-react";
import styles from "./creator-rewards.module.css";

const rewardPaths = [
  {
    icon: Trophy,
    title: "WIN A GAME",
    label: "FOR THE PLAYERS",
    description:
      "Make your next victory count. Wins in eligible BerryBox games could unlock stock rewards beyond the leaderboard.",
  },
  {
    icon: Rocket,
    title: "LAUNCH A GAME",
    label: "FOR THE WORLD BUILDERS",
    description:
      "Turn an AI-built world into a playable release. Qualifying game launches could earn you a stake in real companies.",
  },
  {
    icon: Layers3,
    title: "CREATE A TEMPLATE",
    label: "FOR THE CREATORS",
    description:
      "Give other creators a head start. Publish reusable game templates to the marketplace and qualify for potential stock rewards.",
  },
];

// Illustrative companies only; these are not a supported reward catalog.
const stockExamples = [
  { name: "Apple", ticker: "AAPL" },
  { name: "Microsoft", ticker: "MSFT" },
  { name: "NVIDIA", ticker: "NVDA" },
];

export function CreatorRewards() {
  return (
    <section id="rewards" className={`section-pad ${styles.rewards}`} aria-labelledby="rewards-heading">
      <div className={styles.sectionLabel}>
        <p className="eyebrow lime">08 - PLAY, CREATE & EARN</p>
        <span className={styles.status}>PLANNED / CREATOR ECONOMY</span>
      </div>

      <div className={styles.intro}>
        <h2 id="rewards-heading">PLAY. CREATE.<span>OWN A PIECE.</span></h2>
        <p>
          Your next win. Your first game. A template that sparks a thousand worlds.
          BerryBox&apos;s planned rewards program connects what you contribute to
          something beyond the game: <strong>real-world stock ownership.</strong>
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.pathways}>
          <ol className={styles.pathList} aria-label="Ways to qualify for stock rewards">
            {rewardPaths.map(({ icon: Icon, title, label, description }, index) => (
              <li key={title}>
                <span className={styles.pathNumber}>0{index + 1}</span>
                <div className={styles.pathIcon}><Icon aria-hidden="true" /></div>
                <div>
                  <p className={styles.pathLabel}>{label}</p>
                  <h3>{title}</h3>
                  <p className={styles.pathDescription}>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className={styles.studioLink} href="#studio">
            EXPLORE THE CREATOR STUDIO <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <aside className={styles.showcase} aria-labelledby="stock-rewards-heading">
          <div className={styles.showcaseBar}>
            <span>BERRYBOX / REWARD PREVIEW</span>
            <Boxes aria-hidden="true" />
          </div>
          <div className={styles.showcaseBody}>
            <p className={styles.showcaseEyebrow}>FROM YOUR WORLD TO THE REAL WORLD</p>
            <h3 id="stock-rewards-heading">A NEW KIND<br />OF HIGH SCORE.</h3>
            <p className={styles.showcaseDescription}>Stock rewards. A piece of the companies shaping what&apos;s next.</p>

            <ul className={styles.stocks} aria-label="Illustrative stock reward companies">
              {stockExamples.map(({ name, ticker }) => (
                <li key={ticker}>
                  <div className={styles.stockCard}>
                    <span className={styles.ticker}>{ticker}</span>
                    <span className={styles.company}>{name}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.exampleNote}>Illustrative companies. Final reward selection to be announced.</p>
          </div>
          <div className={styles.showcaseFooter}>
            <span>YOUR SKILL. YOUR CREATIVITY.</span>
            <span>MORE POSSIBILITY. <ArrowUpRight aria-hidden="true" /></span>
          </div>
        </aside>
      </div>

      <div className={styles.disclosure}>
        <span>THE DETAILS MATTER</span>
        <p>
          Stock rewards are a planned feature, not currently available. Eligibility,
          supported stocks, reward amounts and regional availability will be subject
          to final program terms. Company names are examples, not partners or
          endorsements. Stock values can fall as well as rise.
        </p>
      </div>
    </section>
  );
}
