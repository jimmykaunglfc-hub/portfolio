import type { Metadata, Viewport } from "next";
import './globals.css';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import AIChat from '../components/AIChat';
import ClientWrapper from '../components/ClientWrapper';
import { Analytics } from '@vercel/analytics/react'

// Viewport configuration to unlock iOS safe-area insets
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // This specific command fixes the notch overlap
};

export const metadata: Metadata = {
  title: "Jimmy Kaung | Head of Digital Operations & Product",
  description: "Portfolio of Jimmy Kaung. Orchestrating high-impact digital platforms, optimizing operational infrastructure, and leading cross-functional teams in FinTech.",
  keywords: [
    "Jimmy Kaung", 
    "Kaung Htet Oo", 
    "KHNCO", 
    "Jimmy Kaung Portfolio",
    "Head of Digital Operations", 
    "Product Manager", 
    "Senior Product Owner", 
    "Digital Transformation Lead",
    "Tech Lead",
    "FinTech", 
    "Financial Technology", 
    "Digital Platforms", 
    "Enterprise Systems", 
    "Operations Infrastructure", 
    "Cross-functional Leadership",
    "Product Lifecycle Management",
    "KBZ Bank", 
    "digit7s",
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
    // Removed hardcoded "dark" class. Let the system or next-themes handle it!
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      {/* PERFECTED CONTRAST: Deep black for dark mode, crisp slate for light mode */}
      <body className="bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white antialiased transition-colors duration-300">
        
        {/* ClientWrapper kills the FOUC (Flash of Unstyled Content) on initial load */}
        <ClientWrapper>
          <Navbar />
          
          {/* Re-added pb-28 on mobile only so content clears the Glass Bottom Nav */}
          <div className="pt-[env(safe-area-inset-top)] pb-28 md:pb-0 min-h-screen">
            {children}
          </div>
          
          <BottomNav />
          <Analytics />
          <AIChat />
        </ClientWrapper>

      </body>
    </html>
  );
}