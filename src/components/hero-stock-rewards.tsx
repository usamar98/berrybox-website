import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./hero-stock-rewards.module.css";

const companies = [
  { name: "Apple", ticker: "AAPL", logo: "/brands/apple.svg" },
  { name: "Microsoft", ticker: "MSFT", logo: "/brands/microsoft.svg" },
  { name: "NVIDIA", ticker: "NVDA", logo: "/brands/nvidia.svg" },
];

export function HeroStockRewards() {
  return (
    <div className={styles.rewards} role="group" aria-labelledby="hero-rewards-tagline">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>PLANNED CREATOR REWARDS</p>
        <p id="hero-rewards-tagline" className={styles.tagline}>
          BUILD WORLDS. <span>EARN STOCKS.</span>
        </p>
        <a className={styles.detailsLink} href="#rewards">
          Play. Publish. Create. Explore the rewards <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className={styles.examples}>
        <ul className={styles.companies} aria-label="Illustrative stock reward companies">
          {companies.map(({ name, ticker, logo }) => (
            <li key={ticker}>
              <Image src={logo} alt={`${name} logo`} width={26} height={26} loading="eager" />
              <div>
                <span className={styles.companyName}>{name}</span>
                <span className={styles.ticker}>{ticker}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.disclaimer}>Examples only. Not partners. Rewards subject to eligibility.</p>
      </div>
    </div>
  );
}
