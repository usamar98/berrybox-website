import assert from "node:assert/strict";
import { test } from "node:test";
import { hexToString, type Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { parseSiweMessage } from "viem/siwe";
import { DAPP_URL, findMetaMask, verifyWalletOwnership, WalletUnavailableError, walletErrorMessage, type WalletProvider, type WalletStep } from "../src/lib/wallet";

// Ephemeral, unfunded test wallets; no extension or live network is used.
function fixture(options: { wrongSigner?: boolean; switchAccount?: boolean; switchChain?: boolean; reject?: string; empty?: boolean; malformed?: boolean; controller?: AbortController } = {}) {
  const account = privateKeyToAccount(generatePrivateKey());
  const other = privateKeyToAccount(generatePrivateKey());
  const calls: string[] = [];
  let message = "";
  let chainReads = 0;
  const provider: WalletProvider = {
    async request({ method, params }) {
      calls.push(method);
      if (options.reject === method) throw { code: 4001 };
      if (method === "eth_requestAccounts") return options.empty ? [] : [account.address];
      if (method === "eth_accounts") return [options.switchAccount ? other.address : account.address];
      if (method === "eth_chainId") return options.switchChain && chainReads++ > 0 ? "0x89" : "0x1";
      if (method === "personal_sign") {
        assert.equal(params?.[1], account.address);
        message = hexToString(params?.[0] as Hex);
        options.controller?.abort();
        if (options.malformed) return "0xdeadbeef";
        return (options.wrongSigner ? other : account).signMessage({ message });
      }
      throw new Error(`Unexpected wallet method: ${method}`);
    },
  };
  return { account, provider, calls, message: () => message };
}

test("verifies a real personal_sign signature, with site, destination and fresh nonce bound to the message", async () => {
  const wallet = fixture();
  const steps: WalletStep[] = [];
  const verify = () => verifyWalletOwnership(wallet.provider, "https://berrybox.fun", (step) => steps.push(step), new AbortController().signal);
  assert.equal(await verify(), wallet.account.address);
  const first = parseSiweMessage(wallet.message());
  assert.equal(first.domain, "berrybox.fun");
  assert.equal(first.uri, "https://berrybox.fun");
  assert.deepEqual(first.resources, [DAPP_URL]);
  assert.equal(first.chainId, 1);
  assert.match(first.nonce!, /^[a-f0-9]{32}$/);
  assert.equal(first.expirationTime!.getTime() - first.issuedAt!.getTime(), 300_000);
  assert.deepEqual(steps, ["connecting", "signing", "verifying"]);
  assert.deepEqual(wallet.calls, ["eth_requestAccounts", "eth_chainId", "personal_sign", "eth_accounts", "eth_chainId"]);
  await verify();
  assert.notEqual(parseSiweMessage(wallet.message()).nonce, first.nonce);
});

for (const [name, options, expected] of [
  ["wrong signer", { wrongSigner: true }, /verification failed/],
  ["malformed signature", { malformed: true }, /verification failed/],
  ["switched account", { switchAccount: true }, /account or network changed/],
  ["switched network", { switchChain: true }, /account or network changed/],
  ["no selected account", { empty: true }, /No wallet account/],
] as const) {
  test(`blocks continuation for ${name}`, async () => {
    await assert.rejects(verifyWalletOwnership(fixture(options).provider, "https://berrybox.fun", () => {}, new AbortController().signal), expected);
  });
}

for (const method of ["eth_requestAccounts", "personal_sign"]) {
  test(`honors user rejection of ${method}`, async () => {
    const wallet = fixture({ reject: method });
    await assert.rejects(verifyWalletOwnership(wallet.provider, "https://berrybox.fun", () => {}, new AbortController().signal), (error: unknown) => {
      assert.match(walletErrorMessage(error), /cancelled/);
      return true;
    });
    assert.equal(wallet.calls.includes("eth_accounts"), false);
  });
}

test("closing the dialog while signing prevents completion", async () => {
  const controller = new AbortController();
  const wallet = fixture({ controller });
  await assert.rejects(verifyWalletOwnership(wallet.provider, "https://berrybox.fun", () => {}, controller.signal), { name: "AbortError" });
  assert.equal(wallet.calls.includes("eth_accounts"), false);
});

test("expired signatures cannot continue", async (context) => {
  const wallet = fixture();
  context.mock.method(Date, "now", () => new Date().getTime() + 360_000);
  await assert.rejects(verifyWalletOwnership(wallet.provider, "https://berrybox.fun", () => {}, new AbortController().signal), /expired/);
});

test("EIP-6963 chooses MetaMask among multiple announced wallets", async () => {
  const target = new EventTarget();
  const provider = fixture().provider;
  target.addEventListener("eip6963:requestProvider", () => {
    target.dispatchEvent(new CustomEvent("eip6963:announceProvider", { detail: { info: { rdns: "other.wallet" }, provider: fixture().provider } }));
    target.dispatchEvent(new CustomEvent("eip6963:announceProvider", { detail: { info: { rdns: "io.metamask" }, provider } }));
  });
  assert.equal(await findMetaMask(target as unknown as Window), provider);
});

test("legacy discovery selects MetaMask and missing wallets show installation guidance", async () => {
  const provider = { ...fixture().provider, isMetaMask: true };
  const target = Object.assign(new EventTarget(), { ethereum: { providers: [{ isMetaMask: false }, provider] } });
  assert.equal(await findMetaMask(target as unknown as Window), provider);
  await assert.rejects(findMetaMask(new EventTarget() as unknown as Window), WalletUnavailableError);
});

test("pending and disconnected wallets have actionable messages", () => {
  assert.match(walletErrorMessage({ code: -32002 }), /already open/);
  assert.match(walletErrorMessage({ code: 4900 }), /disconnected/);
});
