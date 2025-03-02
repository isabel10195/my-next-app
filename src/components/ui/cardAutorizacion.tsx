'use client'

import Link from 'next/link'
import { UserCircle2, ClipboardList } from 'lucide-react'

export default function CardAutorizacion() {
  return (
    <div className="flex items-center gap-5 justify-center">
      <Link 
        href="/pages/login" 
        className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-[#0a0b2c] p-4 transition-all hover:scale-105"
      >
        <UserCircle2 className="h-12 w-12 text-white" />
        <span className="mt-2 text-sm font-medium text-white  transition-opacity group-hover:opacity-100">
          Login
        </span>
      </Link>

      <div className="h-[2px] w-8 bg-white/20" />

      <Link 
        href="/pages/register" 
        className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-[#0a0b2c] p-4 transition-all hover:scale-105"
      >
        <ClipboardList className="h-12 w-12 text-white" />
        <span className="mt-2 text-sm font-medium text-white  transition-opacity group-hover:opacity-100">
          Register
        </span>
      </Link>
    </div>
  )
}

