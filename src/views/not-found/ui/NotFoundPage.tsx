import Link from 'next/link';

import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">Page is not found</h1>
      <Link href="/" className="button">
        Go to Home
      </Link>
    </div>
  );
}
