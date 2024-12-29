export interface Image {
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

export interface ImageInfo {
  id: string;
  url: string;
  description: string | null;
  likes: number;
  author: string;
}

export interface FetchResponse {
  total_pages: number;
  results: Image[];
}
