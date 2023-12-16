import { GetItemsOverviewApiCall } from "../api/item/GetItemsOverviewApiCall";
import { ItemOverviewCollection } from "../typing/item";
import { generateQueryString } from "./FeedUtils";
import { useInfiniteQuery } from "react-query";
import { State, useSearchFilter } from "./SearchFilterProvider";

export const useInfiniteQueryCustom = (
  itemFilterOptions: State,
  token: string | null
) => {
  const s = useSearchFilter();
  const queryString = generateQueryString(itemFilterOptions);
  console.log("queryString:", queryString);
  return useInfiniteQuery<ItemOverviewCollection, Error>(
    ["items", itemFilterOptions, s.setItemTypeFilter],
    ({ pageParam = 0 }) =>
      GetItemsOverviewApiCall(queryString, pageParam, token),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.offset + lastPage.limit : null,
      keepPreviousData: false,
    }
  );
};
