import React from "react";
import { CgClose } from "react-icons/cg";
import { BsCamera2 } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import Modal from "react-modal";
import { ImageInfo } from "../../types";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onCloseModalClick: () => void;
  imageInfo: ImageInfo | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onCloseModalClick,
  imageInfo,
}) => {
  if (!imageInfo) return null;

  const { url, description, likes, author } = imageInfo;

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      overlayClassName={`${styles.overlay} ${isOpen ? styles.is_open : ""}`}
      onRequestClose={onCloseModalClick}
      shouldFocusAfterRender
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      contentLabel="Photo and images library"
    >
      <button className={styles.btn_close} onClick={onCloseModalClick}>
        <CgClose className={styles.btn_close_icon} />
      </button>
      <div className={styles.card_wrap}>
        <p className={styles.img_descr}>{description || "No description"}</p>
        <img className={styles.img} src={url} alt={description || "Image"} />
        <div className={styles.info_wrap}>
          <p className={styles.info}>
            <BsCamera2 className={styles.info_icon} /> {author}
          </p>
          <p className={styles.info}>
            <AiOutlineLike className={styles.info_icon} /> {likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
