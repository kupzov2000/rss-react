import { useSearchParams } from 'react-router-dom';
import './PaginationMenu.css';

type Props = {
  pages: number;
};

export function PaginationMenu({ pages }: Props) {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const currentPage = Number(searchParameters.get('page')) || 1;

  const goToPage = (page: number) => {
    setSearchParameters({ page: String(page) });
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
