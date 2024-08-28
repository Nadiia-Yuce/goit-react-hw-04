import css from "./SearchBox.module.css";

export default function SearchBox({ value, onSearch }) {
  //контрольований елемент -> передача value і onChange
  return (
    <div className={css.searchContainer}>
      <label htmlFor="searchId" className={css.label}>
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        name="search"
        value={value}
        id="searchId"
        // onSearch = setsearchValue, в який передаємо поточне значення інпуту, яке запишеться в стан
        onChange={evt => onSearch(evt.target.value)}
      />
    </div>
  );
}
