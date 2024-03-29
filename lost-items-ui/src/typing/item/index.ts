export enum ItemType {
  FOUND = "FOUND",
  LOST = "LOST",
}

export type ItemOverviewDto = {
  id: string;
  title: string;
  type: ItemType;
  image: string;
  postDate: string;
  date: string;
  returned: Boolean;
  isFav: Boolean;
};

export type ItemOverviewCollection = {
  items: ItemOverviewDto[];
  totalResults: number;
  limit: number;
  count: number;
  offset: number;
  hasMore: Boolean;
};

export type ItemDetailsDto = {
  id: string;
  date: string;
  postDate: string;
  type: ItemType;
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  range: number;
  userId: string;
  posterFullName: string;
  posterPhoneNumber: string;
  posterImage: string;

  returned: Boolean;
};

export type GetUserFeedbackItemDto = {
  raterId: string;
  rating: number;
  comment: string;
  raterName: string;
  raterImage: string;
};

export type FeedbackCollection = {
  feedbacks: GetUserFeedbackItemDto[];
  totalResults: number;
  limit: number;
  count: number;
  offset: number;
  hasMore: Boolean;
};