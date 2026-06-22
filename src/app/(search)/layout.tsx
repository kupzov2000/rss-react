import { SearchPage } from '@/pages/search-page';
import { ReactNode } from 'react';

interface SearchLayoutProps {
  children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return <SearchPage>{children}</SearchPage>;
}
