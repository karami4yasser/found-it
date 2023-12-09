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
