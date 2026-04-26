import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "C'est la vie | Elite Culinary Experience",
  description: "Curated selections for the discerning palate.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="bg-[#050505] text-white antialiased font-sans select-none">
        <div className="max-w-md mx-auto min-h-screen bg-[#0f1115] flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-x-hidden border-x border-[#1a1c20]">
          <TopNav />
          <main className="flex-1 flex flex-col relative pb-[80px]">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
