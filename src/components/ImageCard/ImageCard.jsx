export default function ImageCard({ item, onClick }) {
  return (
    <div>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => onClick(item)}
      />
    </div>
  );
}
