import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

// Configuración de fuentes con variables CSS
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Usamos variables para CSS
  fallback: ['system-ui', 'arial'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair', // Usamos variables para CSS
  fallback: ['georgia', 'times new roman'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>LureTFG</title>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
