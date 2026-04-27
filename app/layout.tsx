import type {Metadata, Viewport} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0c',
};

export const metadata: Metadata = {
  title: "C'est la vie | Elite Culinary Experience",
  description: "Curated selections for the discerning palate. Premium restaurant with starters, main courses, pasta, desserts and fine drinks.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="bg-[#050505] text-white antialiased font-sans select-none">
        <div className="max-w-md mx-auto min-h-screen bg-[#0a0a0c] flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-x-hidden border-x border-white/[0.04]">
          <TopNav />
          <main className="flex-1 flex flex-col relative pb-[88px]">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
