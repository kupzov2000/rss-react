import { AboutPage } from '@/pages/about-page';
import { SearchPage } from '@/pages/search-page';
import { Menu } from '@/widgets/menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<SearchPage />} />

          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
