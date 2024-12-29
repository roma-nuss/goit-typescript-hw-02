import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Image, ImageInfo } from "../../types"; // Імпорт типів
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (imageInfo: ImageInfo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div>
      <ul className={styles.list}>
        {images.map((image) => (
          <li className={styles.list_item} key={image.id}>
            <ImageCard
              image={image}
              onImageClick={() =>
                onImageClick({
                  id: image.id,
                  url: image.urls.regular,
                  description: image.alt_description,
                  likes: image.likes,
                  author: image.user.name,
                })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
