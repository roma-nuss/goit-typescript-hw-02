import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string | null;
  likes: number;
  user: {
    name: string;
  };
}

interface ImageInfo {
  id: string; // id
  url: string; // url
  description: string | null;
  likes: number;
  author: string;
}

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
        {Array.isArray(images) &&
          images.map((image) => (
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
