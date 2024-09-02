import css from "./ImageCard.module.css";
import clsx from "clsx";

export default function ImageCard({ item, onClick }) {
  return (
    <div className={clsx("animate__animated animate__fadeIn")}>
      <img
        className={css.img}
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => onClick(item)}
      />
      <ul className={css.infoList}>
        <li className={css.info}>💙 {item.likes}</li>
        <li className={css.info}>By {item.user.name}</li>
      </ul>
    </div>
  );
}
