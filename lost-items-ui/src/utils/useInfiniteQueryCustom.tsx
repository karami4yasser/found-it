import {
  GetItemsOverviewApiCall,
  ItemFilterOptions,
} from "../api/item/GetItemsOverviewApiCall";
import { ItemOverviewCollection } from "../typing/item";
import { generateQueryString } from "./FeedUtils";
import { useInfiniteQuery } from "react-query";
export const useInfiniteQueryCustom = (
  itemFilterOptions: ItemFilterOptions
) => {
  const queryString = generateQueryString(itemFilterOptions);
  const result = useInfiniteQuery<ItemOverviewCollection, Error>(
    "items",
    ({ pageParam = 0 }) => GetItemsOverviewApiCall(queryString, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.offset + lastPage.limit : null,
    }
  );
  return result;
};
