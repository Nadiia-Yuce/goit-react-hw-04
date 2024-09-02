import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({ params, onClose }) {
  return (
    <ReactModal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={params.isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      //   shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <img
        src={params.url}
        alt={params.alt}
        className={css.modalImg}
        width="100%"
      />
    </ReactModal>
  );
}
