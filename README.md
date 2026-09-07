This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## MetaMask connection

The header, hero, and footer **Connect Wallet** buttons discover MetaMask using EIP-6963, with a legacy injected-provider fallback. The user approves account access and signs a fresh, five-minute Sign-In with Ethereum message using `personal_sign`. BerryBox verifies the signature against the selected account, checks the account and network are unchanged, and then opens `https://dapp.berrybox.fun`.

Verification runs in the browser and supports standard MetaMask EVM accounts. No transaction, token approval, RPC key, backend secret, or gas payment is required. Users without MetaMask receive installation guidance; on a public HTTPS site they can also open the page in MetaMask's mobile browser.

This is a verified navigation flow, not a shared authentication session. The destination dapp must manage its own wallet connection and authorization; no signature or session credential is forwarded in the redirect URL.

Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` to check the implementation. Wallet tests use ephemeral test accounts and never connect to a live wallet or network.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
