import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.search.value.trim();

    if (!query) {
      toast("❗️The field can not be empty!", {
        duration: 4000,
      });
    }

    onSubmit(query);
    evt.target.reset();
  };

  return (
    <header>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
