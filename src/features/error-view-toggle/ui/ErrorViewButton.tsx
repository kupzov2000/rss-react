import './ErrorViewButton.css';

interface Props {
  onClick: () => void;
}

export function ErrorViewButton({ onClick }: Props) {
  return (
    <button className="error__button button" onClick={onClick}>
      Error
    </button>
  );
}
