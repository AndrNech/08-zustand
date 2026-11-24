import type { Metadata } from 'next';
import { Roboto } from "next/font/google";
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes quickly and efficiently with NoteHub.",
  openGraph: {
    title: "NoteHub",
    description: "Manage your notes quickly and efficiently with NoteHub.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    // <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <TanstackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}

/**Підключення шрифта Roboto

Підключіть шрифт Roboto глобально для всього застосунку у файлі app/layout.tsx.
Для цього скористайтеся вбудованою підтримкою з next/font/google,
обовʼязково вказавши відповідні налаштування (weight, variable, display та subsets).
Та додайте його на body в className.
*/