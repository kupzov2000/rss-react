import { createRoot } from 'react-dom/client';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(<p>Hello!</p>);
