import axios from "axios";

export const AddItemToFavApiCall = async (itemId : string, token: string) => {
  return await axios
    .put(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/items/addToFav/" + itemId, {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};
