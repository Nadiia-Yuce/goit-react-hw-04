import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
import clsx from "clsx";

export default function ImageModal({ params, onClose }) {
  return (
    <ReactModal
      className={clsx(css.modal, params.class)}
      overlayClassName={css.overlay}
      isOpen={params.isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <img src={params.url} alt={params.alt} className={css.modalImg} />
    </ReactModal>
  );
}
