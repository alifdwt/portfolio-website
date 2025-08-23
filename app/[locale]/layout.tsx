import { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

import { routing } from "@/i18n/routing";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alif Dewantara - Fullstack Developer",
  description:
    "Professional portfolio of Alif Dewantara, a fullstack developer specializing in Next.js, React, Golang, and modern web technologies.",
  keywords: [
    "Fullstack Developer",
    "Next.js",
    "React",
    "Golang",
    "TypeScript",
    "Indonesia",
  ],
  authors: [{ name: "Alif Dewantara" }],
  openGraph: {
    title: "Alif Dewantara - Fullstack Developer",
    description: "Building modern web and mobile applications",
    type: "website",
    locale: "en_US",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
