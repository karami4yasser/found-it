import { FeedbackCollection } from "../../typing/item";
import { useInfiniteQuery } from "react-query";
import { GetFeedbacksRequestApiCall } from "./GetFeedbacksApiCall";

export const getFeedbacksInfiniteQuery = (
  token: string | null,
  userId: string | null,
) => {
  return useInfiniteQuery<FeedbackCollection, Error>(
    ["feedbacks", userId, token],
    ({ pageParam = 0 }) =>
      GetFeedbacksRequestApiCall(token, userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasMore ? lastPage.offset + lastPage.limit : null,
      keepPreviousData: false,
    }
  );
};
