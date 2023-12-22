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

  posterFullName: string;
  posterPhoneNumber: string;
  posterImage: string;

  returned: Boolean;
};
