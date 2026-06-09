import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
