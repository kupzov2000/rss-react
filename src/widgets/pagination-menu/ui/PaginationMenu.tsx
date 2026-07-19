'use client';

import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';
import './PaginationMenu.css';

type Props = {
  pages: number;
};

export function PaginationMenu({ pages }: Props) {
  const { page: currentPage, setParameter } = useUrlSearchParameters();

  const goToPage = (page: number) => {
    setParameter('page', String(page));
  };

  const handlePrevious = () => {
    goToPage(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    goToPage(Math.min(pages, currentPage + 1));
  };

  return (
    <div className="pagination">
      <button
        className="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="pagination__current-page">{currentPage}</span>

      <button
        className="button"
        onClick={handleNext}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
}
