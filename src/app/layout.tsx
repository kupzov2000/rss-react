import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Providers } from '@/application/providers';

import '../index.css';

export const metadata: Metadata = {
  title: 'nextjs-ssr',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
