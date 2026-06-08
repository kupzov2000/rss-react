import { createRoot } from 'react-dom/client';
import App from './app/App';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(<App />);
