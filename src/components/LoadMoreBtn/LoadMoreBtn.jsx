import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleLoad }) {
  return (
    <button className={css.loadBtn} onClick={handleLoad} type="button">
      Load more
    </button>
  );
}
