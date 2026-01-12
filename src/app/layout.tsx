import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Deepak Tewatia | macOS Portfolio OS',
  description:
    'A high-fidelity macOS-inspired interactive portfolio. Explore my professional experience, projects, and architecture through a web-based operating system UI.',
  keywords: [
    'Deepak Tewatia',
    'Developer',
    'DevOps Engineer',
    'macOS Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Interactive Portfolio',
    'Software Engineer Portfolio',
    'Web OS',
  ],
  authors: [{ name: 'Deepak Tewatia', url: 'https://github.com/deepak1-1' }],
  creator: 'Deepak Tewatia',
  publisher: 'Deepak Tewatia',
  applicationName: 'Portfolio OS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://deepak-tewatia-portfolio.web.app'), // Replace with actual domain when available
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Deepak Tewatia | macOS Portfolio OS',
    description:
      'Explore the high-fidelity macOS interactive portfolio of Deepak Tewatia, Developer & DevOps Engineer.',
    url: '/',
    siteName: 'Deepak Tewatia Portfolio',
    images: [
      {
        url: '/og-image.png', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'Deepak Tewatia Portfolio OS Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Tewatia | macOS Portfolio OS',
    description: 'High-fidelity macOS interactive portfolio of Deepak Tewatia.',
    images: ['/og-image.png'],
    creator: '@deepaktewatia', // Replace with actual handle if desired
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
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
