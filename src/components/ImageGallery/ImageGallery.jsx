import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={css.list}>
      {images.map(img => (
        <li key={img.id} className={css.item}>
          <ImageCard item={img} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}
