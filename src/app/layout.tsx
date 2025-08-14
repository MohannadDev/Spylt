import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import GSAPProvider from '../components/GSAPProvider';
import Loading from './loading';
import { Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import PageLoader from '@/components/PageLoader';

export const metadata: Metadata = {
  title: 'Spylt remake | GSAP Nextjs website',
  description: 'an awwward winning GSAP website remake by Mohannad a Front-end dev',
  keywords: ['Mohannad Dev', 'awwward winning website remake', 'nextjs', 'react', 'GSAP'],
  authors: [{ name: 'Mohannad' }],
  creator: 'Mohannad',
  publisher: 'Spylt',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohannad-spylt.vercel.app/',
    siteName: 'Spylt',
    title: 'Spylt remake | GSAP Nextjs website',
    description: 'an awwward winning GSAP website remake by Mohannad a Front-end dev',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1431,
        height: 738,
        alt: 'Spylt remake',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spylt remake | GSAP Nextjs website',
    description: 'an awwward winning GSAP website remake by Mohannad a Front-end dev',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* suspense wasn't working properly, the loading will show untill ALL assets should be loaded  */}
            <GSAPProvider />

            <PageLoader>
              <Navbar />
              <main>{children}</main>
            </PageLoader>
          </div>
        </div>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
      </body>
    </html>
  );
}
