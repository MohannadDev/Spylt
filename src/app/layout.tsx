import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Awwward winning website remake',
  description: 'remake of an awwward winning website using Nextjs and GSAP by Mohannad',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
