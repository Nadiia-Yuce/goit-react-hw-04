import { useEffect, useState } from "react";
import { getImages } from "./api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { MagnifyingGlass } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [album, setAlbum] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const getMoreImages = async () => {
      try {
        setLoader(true);
        setError(false);
        const fetchedColection = await getImages(query, page);
        setAlbum(prevColection => [
          ...prevColection,
          ...fetchedColection.images,
        ]);
        setTotalPages(fetchedColection.totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getMoreImages();
  }, [query, page]);

  const handleSearch = async newValue => {
    setQuery(newValue);
    setPage(1);
    setAlbum([]);
  };

  const loadMore = () => {
    setLoader(true);
    setPage(page + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {album !== null && <ImageGallery images={album} />}
      {album.length > 0 && !loader && <LoadMoreBtn handleLoad={loadMore} />}
      {error && <ErrorMessage />}
      {loader && <MagnifyingGlass />}
      {page >= totalPages && <p>End of the Colection!!</p>}
    </div>
  );
}
