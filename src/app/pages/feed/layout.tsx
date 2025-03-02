"use client";

import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ["latin"] });

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-200 dark:bg-gray-950 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
