import axios from "axios";

export const GetCategoriesApiCall = async () => {
  return await axios
    .get(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/items/categories")
    .then((response) => response)
    .catch((err) => err.response);
};
