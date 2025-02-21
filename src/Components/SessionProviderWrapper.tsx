"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <SessionProvider session={pageProps?.session}>{children}</SessionProvider>
  );
}
