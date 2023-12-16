import axios from "axios";
import { ItemOverviewDto, ItemType } from "../../typing/item";
import { useAuth } from "../../utils/AuthProvider";

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
  token: string | null
) => {
  let offsetParamsString = "";
  if (requestParamsString == "") {
    offsetParamsString = "?offset=" + offsetParams;
  } else {
    offsetParamsString = "&offset=" + offsetParams;
  }
  if (token) {
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
        offsetParamsString
    );
    return data;
  }
};
