import { useEffect, useState } from "react";
import { getImages } from "./api";
import { MagnifyingGlass } from "react-loader-spinner";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import css from "./App.module.css";

export default function App() {
  const [album, setAlbum] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [modal, setModal] = useState({
    isOpen: false,
    url: "",
    alt: "",
    class: "",
  });

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
      } catch {
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

  useEffect(() => {
    if (modal.isOpen) {
      setModal(prev => ({
        ...prev,
        class: "animate__animated animate__fadeIn",
      }));
    } else {
      setModal(prev => ({
        ...prev,
        class: "animate__animated animate__fadeOut",
      }));
    }
  }, [modal.isOpen]);

  const openModal = img => {
    setModal({
      isOpen: true,
      url: img.urls.regular,
      alt: img.alt_description,
    });
  };

  const closeModal = () => {
    setModal(prev => ({
      ...prev,
      class: "animate__animated animate__fadeOut",
    }));

    setTimeout(() => {
      setModal({
        isOpen: false,
        url: "",
        alt: "",
        class: "",
      });
    }, 500);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {album !== null && <ImageGallery images={album} onClick={openModal} />}
      {album.length > 0 && !loader && <LoadMoreBtn handleLoad={loadMore} />}
      {error && <ErrorMessage />}
      <div className={css.loader}>{loader && <MagnifyingGlass />}</div>
      {page >= totalPages && (
        <p className={css.endNot}>End of the Colection!!</p>
      )}
      {modal.isOpen && <ImageModal params={modal} onClose={closeModal} />}
    </div>
  );
}
