import axios from "axios";
import { ItemOverviewDto, ItemType } from "../../typing/item";

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
  offsetParams: number
) => {
  let offsetParamsString = "";
  if (requestParamsString == "") {
    offsetParamsString = "?offset=" + offsetParams;
  } else {
    offsetParamsString = "&offset=" + offsetParams;
  }
  try {
    const response = await axios
      .get(
        process.env.EXPO_PUBLIC_API_BASE_URL +
          "/api/items" +
          requestParamsString +
          offsetParamsString
      )
      .then((response) => response)
      .catch((err) => err.response);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    return error;
  }
};
