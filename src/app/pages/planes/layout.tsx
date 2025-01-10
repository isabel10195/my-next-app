// layout.tsx (en el directorio de planes)
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mejora Tu Plan',
  description: 'A clone of the Lure website',
}

export default function PlanesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {children}
    </div>
  )
}
