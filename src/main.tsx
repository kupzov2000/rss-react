import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SearchBar from './features/search/ui/SearchBar';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(
  <StrictMode>
    <SearchBar />
  </StrictMode>
);
