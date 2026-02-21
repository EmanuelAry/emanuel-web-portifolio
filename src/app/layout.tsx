import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { w95font } from '@/styles/fonts/w95';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Emanuel Ary',
  description: "Emanuel Ary de Oliveira's personal portfolio",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning 
        className={`flex h-screen flex-col bg-green-200 ${w95font.className} text-2xl`}
        style={{
          background: `#018281`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
