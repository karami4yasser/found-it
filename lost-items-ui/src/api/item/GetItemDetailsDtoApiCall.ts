import axios from "axios";

export const GetItemDetailsDtoApiCall = async (id: string) => {
  return await axios
    .get(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/items/" + id)
    .then((response) => response)
    .catch((err) => err.response);
};
