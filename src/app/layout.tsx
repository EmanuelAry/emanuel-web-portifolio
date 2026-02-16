import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '../styles/global.css';
import { w95font } from '@/styles/fonts/w95';

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
