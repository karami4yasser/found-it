import { GetItemsOverviewApiCall } from "./GetItemsOverviewApiCall";
import { ItemOverviewCollection } from "../../typing/item";
import { generateQueryString } from "../../utils/FeedUtils";
import { useInfiniteQuery } from "react-query";
import { State, useSearchFilter } from "../../utils/SearchFilterProvider";
import { useAuth } from "../../utils/AuthProvider";

export const getItemsInfiniteQuery = (
  itemFilterOptions: State,
  userId: string | null
) => {
  const {accessToken} = useAuth();
  const s = useSearchFilter();
  const queryString = generateQueryString(itemFilterOptions);
  console.log("queryString:", queryString);
  return useInfiniteQuery<ItemOverviewCollection, Error>(
    ["items", itemFilterOptions, s.setItemTypeFilter, userId],
    ({ pageParam = 0 }) =>
      GetItemsOverviewApiCall(queryString, pageParam, userId, accessToken),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.offset + lastPage.limit : null,
      keepPreviousData: false,
    }
  );
};
