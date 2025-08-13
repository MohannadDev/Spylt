import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import GSAPProvider from '../components/GSAPProvider';
import Loading from './loading';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Spylt remake',
  description: 'remake of an awwward winning website using Nextjs and GSAP by Mohannad',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Suspense fallback={<Loading />}>
              <GSAPProvider />
              <Navbar />
              <main>{children}</main>
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
