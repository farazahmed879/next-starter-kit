"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProviderWrapper from "@/Components/SessionProviderWrapper";
import { AuthConextProvider } from "@/context/AuthContext";
import TawkTo from "@/Components/TawkTo";
import { NextScript } from "next/document";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper pageProps={pageProps}>
          <AuthConextProvider>{children}</AuthConextProvider>
        </SessionProviderWrapper>

        {/* <Script
          src="https://embed.tawk.to/6761991a49e2fd8dfef9795f/1ifajs48e"
          strategy="lazyOnload"
          onError={(e) => {
            console.error("Tawk.to script failed to load:", e);
          }}
        /> */}
        {/* <TawkTo /> */}
      </body>
    </html>
  );
}
