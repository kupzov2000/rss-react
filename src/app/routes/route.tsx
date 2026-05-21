import { AboutPage } from '@/pages/about-page';
import { CharacterDetails } from '@/pages/character-details';
import { NotFoundPage } from '@/pages/not-found';
import { SearchPage } from '@/pages/search-page';
import { Menu } from '@/widgets/menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/" element={<SearchPage />}>
            <Route path="details/:id" element={<CharacterDetails />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
