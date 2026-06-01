import { useAppDispatch } from '@/app/store/hooks';
import { charactersApi } from '@/entities/character';
import './RefreshCacheButton.css';
import type { ReactNode } from 'react';

type RefreshCacheTags = Parameters<typeof charactersApi.util.invalidateTags>[0];

type Props = {
  tags: RefreshCacheTags;
  className?: string;
  children?: ReactNode;
};

function RefreshIcon() {
  return (
    <span className="refresh-cache-button__icon" aria-hidden="true">
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function RefreshCacheButton({ tags, children, className = '' }: Props) {
  const dispatch = useAppDispatch();

  function handleRefreshCache() {
    dispatch(charactersApi.util.invalidateTags(tags));
  }

  return (
    <button
      className={`refresh-button button ${className}`}
      type="button"
      onClick={handleRefreshCache}
    >
      <RefreshIcon />
      {children}
    </button>
  );
}
