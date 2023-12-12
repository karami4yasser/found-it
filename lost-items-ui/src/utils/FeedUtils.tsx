import { ItemFilterOptions } from "../api/item/GetItemsOverviewApiCall";
import { State } from "./SearchFilterProvider";

export const generateQueryString = (params: State): string => {
  const queryParams: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      let paramValue = value;

      // Convert boolean values to lowercase string
      if (key === "returned" && typeof paramValue === "boolean") {
        paramValue = paramValue.toString().toLowerCase();
      }

      queryParams.push(`${key}=${paramValue}`);
    }
  });

  if (queryParams.length > 0) {
    return "?" + queryParams.join("&");
  } else {
    return "";
  }
};
