"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, LoaderCircle, ShieldCheck, Wallet, X } from "lucide-react";
import { DAPP_URL, findMetaMask, verifyWalletOwnership, WalletUnavailableError, walletErrorMessage, type WalletStep } from "@/lib/wallet";
import styles from "./wallet-connect.module.css";

const WalletContext = createContext<{ connect: () => void; busy: boolean } | null>(null);
const stepMessages = {
  connecting: "Choose your account and approve the connection in MetaMask.",
  signing: "Sign the wallet-ownership message in MetaMask to continue. No gas fee is required.",
  verifying: "Verifying your wallet signature…",
  redirecting: "Wallet verified. Opening BerryBox…",
};

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const attempt = useRef<AbortController | null>(null);
  const [step, setStep] = useState<WalletStep | "redirecting">("connecting");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [mobileLink, setMobileLink] = useState<string | null>(null);

  useEffect(() => () => attempt.current?.abort(), []);

  function close() {
    attempt.current?.abort();
    attempt.current = null;
    setBusy(false);
    dialog.current?.close();
  }

  async function connect() {
    if (attempt.current) return;
    const controller = new AbortController();
    attempt.current = controller;
    setBusy(true);
    setError(null);
    setUnavailable(false);
    setStep("connecting");
    dialog.current?.showModal();
    try {
      const provider = await findMetaMask();
      await verifyWalletOwnership(provider, window.location.origin, setStep, controller.signal);
      controller.signal.throwIfAborted();
      setStep("redirecting");
      window.location.assign(DAPP_URL);
    } catch (failure) {
      if (controller.signal.aborted) return;
      setError(walletErrorMessage(failure));
      if (failure instanceof WalletUnavailableError) {
        setUnavailable(true);
        // Public HTTPS sites can be opened inside MetaMask's mobile browser.
        if (window.location.protocol === "https:") {
          setMobileLink(`https://link.metamask.io/dapp/${window.location.host}${window.location.pathname}`);
        }
      }
      setBusy(false);
      attempt.current = null;
    }
  }

  return <WalletContext.Provider value={{ connect, busy }}>
    {children}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="wallet-title" aria-describedby="wallet-description" onCancel={(event) => { event.preventDefault(); close(); }}>
      <button type="button" className={styles.close} aria-label="Close wallet connection" onClick={close}><X size={20} /></button>
      <div className={styles.icon}><Wallet size={28} /></div>
      <p className={styles.eyebrow}>BERRYBOX / WALLET ACCESS</p>
      <h2 id="wallet-title">CONNECT WALLET</h2>
      <p id="wallet-description">Connect with MetaMask and verify wallet ownership to continue to dapp.berrybox.fun.</p>
      {error ? <p role="alert" className={styles.error}>{error}</p> : <p role="status" className={styles.status}><LoaderCircle className={styles.spinner} size={20} />{stepMessages[step]}</p>}
      {unavailable ? <div className={styles.actions}>
        <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Get MetaMask <ArrowUpRight size={16} /></a>
        {mobileLink ? <a href={mobileLink}>Open in MetaMask <ArrowUpRight size={16} /></a> : null}
        <p>On mobile, open this website in the MetaMask app browser, then tap Connect Wallet.</p>
      </div> : null}
      {!busy ? <button type="button" className={styles.retry} onClick={connect}>TRY AGAIN <ArrowUpRight size={16} /></button> : null}
      <p className={styles.note}><ShieldCheck size={18} />A message signature only. No transaction or token approval.</p>
    </dialog>
  </WalletContext.Provider>;
}

export function ConnectWalletButton({ className, onClick }: { className: string; onClick?: () => void }) {
  const context = useContext(WalletContext);
  if (!context) throw new Error("ConnectWalletButton requires WalletConnectProvider");
  return <button type="button" className={`${className} ${styles.trigger}`} disabled={context.busy} onClick={() => { onClick?.(); context.connect(); }}>
    CONNECT WALLET <ArrowUpRight aria-hidden="true" />
  </button>;
}
