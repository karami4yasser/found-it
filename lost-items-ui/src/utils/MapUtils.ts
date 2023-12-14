export const MAX_NON_PREMIUM_ITEM_POST_RANGE = 200.0;
export const MAX_NON_PREMIUM_ITEM_SEARCH_RANGE = 300.0;
export const MAX_ITEM_POST_RANGE = 500.0;
export const MAX_ITEM_SEARCH_RANGE = 800.0;

export type Coordinates = {
  latitude: number;
  longitude: number;
};

const itemTypeOptions = [
  { label: "Lost", value: "LOST" },
  { label: "Found", value: "FOUND" },
];
