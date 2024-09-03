import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.search.value.trim();

    if (!query) {
      toast("❗️The field can not be empty!", {
        duration: 4000,
      });
      return;
    }

    onSubmit(query);
    // evt.target.reset();
  };

  return (
    <header className={css.header}>
      <Toaster />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
