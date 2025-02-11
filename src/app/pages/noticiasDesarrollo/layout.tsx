import type { Metadata } from "next";
import { Inter } from "next/font/google";

import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lure - Noticias",
  description: "Mantente al día con las últimas actualizaciones y noticias de Lure",
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
}
