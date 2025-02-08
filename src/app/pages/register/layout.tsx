import React from 'react';
import "../../globals.css";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-[var(--bg-color)] dark:text-[var(--text-color)] bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {children}
    </div>
  );
}
