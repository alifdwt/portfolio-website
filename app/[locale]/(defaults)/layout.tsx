import React from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function LocaleDefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
