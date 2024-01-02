import axios from "axios";
import { ItemType } from "../../typing/item";

export type ItemFilterOptions = {
  category: string | null;
  type: ItemType | null;
  text: string | null;
  dateLeft: string | null;
  dateRight: string | null;
  longitude: number | null;
  latitude: number | null;
  range: number | null;
  returned: Boolean | null;
};

export const GetItemsOverviewApiCall = async (
  requestParamsString: string,
  offsetParams: number,
  token: string | null,
  userId: string | null
) => {
  let offsetParamsString = "";
  if (requestParamsString == "") {
    offsetParamsString = "?offset=" + offsetParams;
  } else {
    offsetParamsString = "&offset=" + offsetParams;
  }
  if (userId) {
    requestParamsString = requestParamsString + "&userId=" + userId;
    const { data } = await axios.get(
      process.env.EXPO_PUBLIC_API_BASE_URL +
        "/api/items" +
        requestParamsString +
        offsetParamsString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    return data;
  } else if (token) {
    const { data } = await axios.get(
      process.env.EXPO_PUBLIC_API_BASE_URL +
        "/api/items" +
        requestParamsString +
        offsetParamsString,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.get(
      process.env.EXPO_PUBLIC_API_BASE_URL +
        "/api/items" +
        requestParamsString +
        offsetParamsString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    return data;
  }
};
