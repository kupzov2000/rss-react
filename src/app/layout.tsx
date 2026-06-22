import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Menu } from '@/widgets/menu';

import '../index.css';
import { Providers } from './providers';

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
        <Providers>
          <Menu>{children}</Menu>
        </Providers>
      </body>
    </html>
  );
}
