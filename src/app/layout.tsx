import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});
const anton=Anton({variable:"--font-anton",weight:"400",subsets:["latin"]});
export const metadata:Metadata={title:"Berrybox — Create Games With AI",description:"Turn ideas into playable AI-powered game worlds.",icons:{icon:"/favicon.png?v=3",shortcut:"/favicon.png?v=3",apple:"/favicon.png?v=3"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}><body>{children}</body></html>}



