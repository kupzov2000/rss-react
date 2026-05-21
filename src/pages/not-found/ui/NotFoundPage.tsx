import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">Page is not found</h1>
      <Link to="/" className="button">
        Go to Home
      </Link>
    </div>
  );
}
