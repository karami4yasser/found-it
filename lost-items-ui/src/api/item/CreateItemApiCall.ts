import axios from "axios";
import { ItemType } from "../../typing/item";

export type CreateItemRequestDto = {
  date?: string;
  type: ItemType;
  title: string;
  photo?: string;
  description: string;
  longitude: number;
  latitude: number;
  category: string;
  range: number;
};

export const CreateItemApiCall = async (
  token: string,
  dto: CreateItemRequestDto
) => {
  return await axios
    .post(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/items", dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};
