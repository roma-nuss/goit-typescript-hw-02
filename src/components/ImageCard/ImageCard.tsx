import React from "react";
import { Image, ImageInfo } from "../../types"; // Імпорт типів
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onImageClick: (imageInfo: ImageInfo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const handleClick = () => {
    const imageInfo: ImageInfo = {
      id: image.id, // Додавання id, якщо необхідно
      url: image.urls.regular,
      description: image.alt_description,
      likes: image.likes,
      author: image.user.name,
    };

    onImageClick(imageInfo);
  };

  return (
    <div className={styles.image_card}>
      <img
        onClick={handleClick}
        className={styles.img}
        src={image.urls.small}
        alt={image.alt_description || "Image"}
      />
    </div>
  );
};

export default ImageCard;
