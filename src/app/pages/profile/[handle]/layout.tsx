// profile/layout.tsx
"use client";

import { ProfileProvider } from "@/app/context/ProfileContext";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      {children}
    </ProfileProvider>
  );
}
