import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { ClerkProvider } from '@clerk/nextjs';
import { plPL } from '@clerk/localizations';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Trener personalny',
    default: 'Znajdź trenera personalnego'
  },
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
      signInFallbackRedirectUrl="/panel"
      signUpFallbackRedirectUrl="/panel"
      appearance={{
        layout: {
          helpPageUrl: '/faq',
          unsafe_disableDevelopmentModeWarnings: true
        }
      }}
    >
      <html lang="pl">
        <body className={`antialiased`}>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
