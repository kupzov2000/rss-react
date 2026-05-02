export default function handleChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  localStorage.setItem('search_data', event.currentTarget.value);
}
