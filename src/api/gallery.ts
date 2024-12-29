import axios, { AxiosResponse } from "axios";

interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

interface FetchImagesResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

const galleryInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: "acVujeomuaS1q3_vwesJkm8Mq5vVW_MEzbexo3KLiyo",
    orientation: "portrait",
  },
});

export const fetchImagesBySearchValue = async (
  searchValue: string,
  page: number
): Promise<FetchImagesResponse> => {
  try {
    const response: AxiosResponse<FetchImagesResponse> =
      await galleryInstance.get("/search/photos", {
        params: {
          query: searchValue,
          page,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching images: ", error);
    throw error;
  }
};
