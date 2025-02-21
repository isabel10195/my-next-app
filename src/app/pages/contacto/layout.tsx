import type React from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
