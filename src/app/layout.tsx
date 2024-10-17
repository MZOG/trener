import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import { plPL } from '@clerk/localizations';
import './globals.css';
import Header from '@/components/Header';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Znajdź trenera personalnego',
  description:
    'Darmowa wyszukiwarka trenerów personalnych w Twoim mieście. Wpisz swoje miasto i znajdź trenera personalnego.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={plPL}
      appearance={{
        layout: {
          // termsPageUrl: '/terms',
          helpPageUrl: '/faq',
          unsafe_disableDevelopmentModeWarnings: true
        }
      }}
    >
      <html lang="pl">
        <body className={`${geistSans.variable} antialiased bg-[#FBFCFF]`}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
