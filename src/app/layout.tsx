import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BerryBox - Create Games With AI",
  description: "Turn ideas into playable AI-powered game worlds.",
  icons: { icon: "/favicon.png?v=3", shortcut: "/favicon.png?v=3", apple: "/favicon.png?v=3" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
