import type { ReactNode } from 'react';

import './ErrorViewButton.css';

interface Props {
  onClick: () => void;
  children?: ReactNode;
}

export function ErrorViewButton({ onClick, children = 'Error' }: Props) {
  return (
    <button className="error__button button" onClick={onClick}>
      {children}
    </button>
  );
}
