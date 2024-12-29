import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { fetchImagesBySearchValue } from "./api/gallery";
import { noMatches } from "./messages/toastMessages";

import Section from "./components/Section/Section";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { Image, ImageInfo, FetchResponse } from "./types";

import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [fetchedImages, setFetchedImages] = useState<Image[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedImage, setClickedImage] = useState<ImageInfo | null>(null);

  const fetchImages = async (
    searchValue: string,
    page: number
  ): Promise<void> => {
    try {
      setIsLoading(true);

      const data: FetchResponse = await fetchImagesBySearchValue(
        searchValue,
        page
      );

      if (data.total_pages === 0) {
        noMatches(searchValue);
        return;
      }

      setTotalPages(data.total_pages);

      if (page > 1) {
        setFetchedImages((prevImages) =>
          prevImages ? [...prevImages, ...data.results] : data.results
        );
      } else {
        setFetchedImages(data.results);
      }

      if (isError !== null) {
        setIsError(null);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setIsError(errorMessage);
      setFetchedImages(null);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (queryText: string): void => {
    setPage(1);
    setSearchValue(queryText);
  };

  const onLoadMoreClick = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const onImageClick = (imageInfo: ImageInfo): void => {
    setClickedImage(imageInfo);
    openModal();
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!searchValue) return;

    fetchImages(searchValue, page);
  }, [searchValue, page]);

  return (
    <>
      <SearchBar onSubmit={onSearch} />
      <Toaster />
      <Section>
        {isError && <ErrorMessage error={isError} />}
        {fetchedImages && (
          <ImageGallery images={fetchedImages} onImageClick={onImageClick} />
        )}
        {totalPages > 1 && totalPages !== page && (
          <LoadMoreBtn onLoadMoreClick={onLoadMoreClick} />
        )}
        <ImageModal
          isOpen={isModalOpen}
          onCloseModalClick={closeModal}
          imageInfo={clickedImage}
        />
        {isLoading && <Loader />}
      </Section>
    </>
  );
}

export default App;
