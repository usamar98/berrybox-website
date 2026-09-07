import type { Address, Hex } from "viem";

export const DAPP_URL = "https://dapp.berrybox.fun";
export type WalletStep = "connecting" | "signing" | "verifying";

export interface WalletProvider {
  isMetaMask?: boolean;
  providers?: WalletProvider[];
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

export class WalletUnavailableError extends Error {}

// EIP-6963 selects MetaMask even when another extension owns window.ethereum.
export function findMetaMask(target: Window = window): Promise<WalletProvider> {
  return new Promise((resolve, reject) => {
    let finished = false;
    const cleanup = () => {
      target.removeEventListener("eip6963:announceProvider", announce);
      clearTimeout(timer);
    };
    const accept = (provider: WalletProvider) => {
      if (finished) return;
      finished = true;
      cleanup();
      resolve(provider);
    };
    const announce = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.info?.rdns === "io.metamask" && typeof detail.provider?.request === "function") {
        accept(detail.provider);
      }
    };
    const timer = setTimeout(() => {
      const injected = (target as Window & { ethereum?: WalletProvider }).ethereum;
      const provider = injected?.providers?.find((item) => item.isMetaMask) ??
        (injected?.isMetaMask ? injected : undefined);
      if (provider && typeof provider.request === "function") accept(provider);
      else {
        cleanup();
        reject(new WalletUnavailableError("MetaMask was not found in this browser."));
      }
    }, 400);
    target.addEventListener("eip6963:announceProvider", announce);
    target.dispatchEvent(new Event("eip6963:requestProvider"));
  });
}

function firstAccount(accounts: unknown): Address {
  if (!Array.isArray(accounts) || typeof accounts[0] !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(accounts[0])) {
    throw new Error("No wallet account was selected. Choose an account in MetaMask and try again.");
  }
  return accounts[0] as Address;
}

export async function verifyWalletOwnership(
  provider: WalletProvider,
  origin: string,
  onStep: (step: WalletStep) => void,
  signal: AbortSignal,
): Promise<Address> {
  signal.throwIfAborted();
  onStep("connecting");
  const address = firstAccount(await provider.request({ method: "eth_requestAccounts" }));
  signal.throwIfAborted();
  const chain = await provider.request({ method: "eth_chainId" });
  const chainId = typeof chain === "string" && /^0x[0-9a-f]+$/i.test(chain) ? Number(chain) : NaN;
  if (!Number.isSafeInteger(chainId) || chainId <= 0) throw new Error("MetaMask returned an unsupported network. Select an EVM network and try again.");

  const [{ getAddress, stringToHex, verifyMessage }, { createSiweMessage }] = await Promise.all([
    import("viem"),
    import("viem/siwe"),
  ]);
  signal.throwIfAborted();
  const site = new URL(origin);
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const issuedAt = new Date();
  const expirationTime = new Date(issuedAt.getTime() + 5 * 60 * 1000);
  const message = createSiweMessage({
    address: getAddress(address),
    chainId,
    domain: site.host,
    uri: site.origin,
    version: "1",
    nonce,
    issuedAt,
    expirationTime,
    statement: "Verify wallet ownership to continue to BerryBox. This does not authorize a transaction or token approval.",
    resources: [DAPP_URL],
  });

  onStep("signing");
  const signature = await provider.request({ method: "personal_sign", params: [stringToHex(message), address] });
  signal.throwIfAborted();
  onStep("verifying");
  if (typeof signature !== "string" || !/^0x[0-9a-f]+$/i.test(signature)) throw new Error("MetaMask returned an invalid signature. Please try again.");
  let verified = false;
  try {
    verified = await verifyMessage({ address, message, signature: signature as Hex });
  } catch {
    // Malformed signatures and signatures from another account both fail closed.
  }
  if (!verified) throw new Error("Wallet verification failed. Please reconnect and sign with the selected account.");
  signal.throwIfAborted();
  const currentAddress = firstAccount(await provider.request({ method: "eth_accounts" }));
  const currentChain = await provider.request({ method: "eth_chainId" });
  signal.throwIfAborted();
  if (currentAddress.toLowerCase() !== address.toLowerCase() || currentChain !== chain) {
    throw new Error("Your account or network changed during verification. Please connect again.");
  }
  if (Date.now() >= expirationTime.getTime()) throw new Error("The verification request expired. Please connect again.");
  return address;
}

export function walletErrorMessage(error: unknown): string {
  const code = typeof error === "object" && error !== null && "code" in error ? error.code : undefined;
  if (code === 4001) return "Request cancelled in MetaMask. Connect again when you are ready.";
  if (code === -32002) return "A MetaMask request is already open. Complete or dismiss it in MetaMask, then try again.";
  if (code === 4100) return "Allow BerryBox to access your selected account in MetaMask, then try again.";
  if (code === 4900 || code === 4901) return "MetaMask is disconnected. Reconnect your wallet and try again.";
  return error instanceof Error ? error.message : "Unable to connect to MetaMask. Please try again.";
}
