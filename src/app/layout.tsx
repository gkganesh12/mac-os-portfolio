import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { DesktopGuard } from '@/components/layout/DesktopGuard';
import { AppRoot } from '@/components/layout/AppRoot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Deepak Tewatia | Portfolio OS',
  description: 'A high-fidelity macOS inspired portfolio built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden bg-[#0A0A0A] text-white antialiased selection:bg-blue-500/30`}
      >
        <DesktopGuard>
          <AppRoot>{children}</AppRoot>
        </DesktopGuard>
      </body>
    </html>
  );
}
