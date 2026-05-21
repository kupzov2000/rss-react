import './ErrorComponent.css';

export default function ErrorComponent() {
  return (
    <div className="error__wrapper">
      <h1>Something went wrong, the button below should help</h1>
      <button
        className="error__refresh"
        onClick={() => globalThis.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}
