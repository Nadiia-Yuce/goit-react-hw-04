import axios from "axios";

export async function getImages(newQuery, page) {
  const API_KEY = "s59p4VYm3Acb8z77Sa8gmjO2I2_fdyb757akeP_HzbE";
  axios.defaults.baseURL = "https://api.unsplash.com";
  const response = await axios.get("/search/photos/", {
    params: {
      client_id: API_KEY,
      query: newQuery,
      page,
      per_page: 10,
      orientation: "landscape",
    },
  });
  // console.log(response.data.results);

  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
}
