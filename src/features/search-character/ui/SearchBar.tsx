import './SearchBar.css';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  onClick,
  placeholder,
}: Props) {
  return (
    <div className="search">
      <input
        className="search__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button className="search__button" onClick={onClick}>
        Search
      </button>
    </div>
  );
}
