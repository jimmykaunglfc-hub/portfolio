import type { Metadata } from "next";
import './globals.css';
import Navbar from '../components/Navbar';
import AIChat from '../components/TempChat';
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: "Jimmy Kaung | Head of Digital Operations & Product",
  description: "Portfolio of Jimmy Kaung. Orchestrating high-impact digital platforms, optimizing operational infrastructure, and leading cross-functional teams in FinTech.",
  keywords: [
    // Personal & Brand Identity
    "Jimmy Kaung", 
    "Kaung Htet Oo", 
    "KHNCO", 
    "Jimmy Kaung Portfolio",
    
    // Core Roles & Titles
    "Head of Digital Operations", 
    "Product Manager", 
    "Senior Product Owner", 
    "Digital Transformation Lead",
    "Tech Lead",

    // Industry & Expertise
    "FinTech", 
    "Financial Technology", 
    "Digital Platforms", 
    "Enterprise Systems", 
    "Operations Infrastructure", 
    "Cross-functional Leadership",
    "Product Lifecycle Management",

    // Past Experience Context (Helps if people search your old roles)
    "KBZ Bank", 
    "digit7s",

    // Technical Context
    "Next.js", 
    "React", 
    "Technical Portfolio"
  ],
  openGraph: {
    title: "Jimmy Kaung | Head of Digital Operations",
    description: "Driving end-to-end product lifecycles and leading market-leading enterprise systems.",
    url: "https://kghtetoo.com",
    siteName: "Jimmy Kaung Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmy Kaung | Digital Operations & Product",
    description: "Orchestrating high-impact digital platforms and FinTech channels.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#09090b] text-[#e5e1e4] antialiased">
        <Navbar />
        {children}
        <Analytics />
        <AIChat />
      </body>
    </html>
  );
}