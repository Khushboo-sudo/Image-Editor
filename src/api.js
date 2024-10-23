import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const searchImages = async (query) => {
  const response = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: 10,
  });
  return response.response.results;
};
