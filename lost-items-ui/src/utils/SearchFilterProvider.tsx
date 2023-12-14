import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { ItemType } from "../typing/item";
type ActionType =
  | { type: "SET_ITEM_TYPE_FILTER"; payload: ItemType | null }
  | { type: "SET_QUERY_FILTER"; payload: string | null }
  | { type: "SET_CATEGORY_FILTER"; payload: string | null }
  | { type: "SET_DATE_LEFT_FILTER"; payload: string | null }
  | { type: "SET_DATE_RIGHT_FILTER"; payload: string | null }
  | { type: "SET_LATITUDE_FILTER"; payload: number | null }
  | { type: "SET_LONGITUDE_FILTER"; payload: number | null }
  | { type: "SET_RANGE_FILTER"; payload: number | null }
  | { type: "SET_RETURNED_FILTER"; payload: boolean | null };

// Reducer state type
export interface State {
  type: ItemType | null;
  text: string | null;
  category: string | null;
  dateLeft: string | null;
  dateRight: string | null;
  longitude: number | null;
  latitude: number | null;
  range: number | null;
  returned: boolean | null;
}
type SearchFilterContextType = {
  setItemTypeFilter: (payload: ItemType | null) => void;
  setQueryFilter: (payload: string | null) => void;
  setCategoryFilter: (payload: string | null) => void;
  setDateLeftFilter: (payload: string | null) => void;
  setDateRightFilter: (payload: string | null) => void;
  setLatitudeFilter: (payload: number | null) => void;
  setLongitudeFilter: (payload: number | null) => void;
  setRangeFilter: (payload: number | null) => void;
  setReturnedFilter: (payload: boolean | null) => void;
  itemFilterOptionsState: State;
  clearItemFilterOptions: () => void;
};

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(
  undefined
);

export const SearchFilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Reducer function
  const filtersReducer = (state: State, action: ActionType): State => {
    switch (action.type) {
      case "SET_ITEM_TYPE_FILTER":
        return { ...state, type: action.payload };
      case "SET_QUERY_FILTER":
        return { ...state, text: action.payload };
      case "SET_CATEGORY_FILTER":
        return { ...state, category: action.payload };
      case "SET_DATE_LEFT_FILTER":
        return { ...state, dateLeft: action.payload };
      case "SET_DATE_RIGHT_FILTER":
        return { ...state, dateRight: action.payload };
      case "SET_LATITUDE_FILTER":
        return { ...state, latitude: action.payload };
      case "SET_LONGITUDE_FILTER":
        return { ...state, longitude: action.payload };
      case "SET_RANGE_FILTER":
        return { ...state, range: action.payload };
      case "SET_RETURNED_FILTER":
        return { ...state, returned: action.payload };
      default:
        return state;
    }
  };
  const [itemFilterOptionsState, dispatch] = useReducer(filtersReducer, {
    type: null,
    text: null,
    category: null,
    dateLeft: null,
    dateRight: null,
    longitude: null,
    latitude: null,
    range: null,
    returned: null,
  });
  // Action creators
  const setItemTypeFilter = (payload: ItemType | null) =>
    dispatch({ type: "SET_ITEM_TYPE_FILTER", payload });
  const setQueryFilter = (payload: string | null) =>
    dispatch({ type: "SET_QUERY_FILTER", payload });
  const setCategoryFilter = (payload: string | null) =>
    dispatch({ type: "SET_CATEGORY_FILTER", payload });
  const setDateLeftFilter = (payload: string | null) =>
    dispatch({ type: "SET_DATE_LEFT_FILTER", payload });
  const setDateRightFilter = (payload: string | null) =>
    dispatch({ type: "SET_DATE_RIGHT_FILTER", payload });
  const setLatitudeFilter = (payload: number | null) =>
    dispatch({ type: "SET_LATITUDE_FILTER", payload });
  const setLongitudeFilter = (payload: number | null) =>
    dispatch({ type: "SET_LONGITUDE_FILTER", payload });
  const setRangeFilter = (payload: number | null) =>
    dispatch({ type: "SET_RANGE_FILTER", payload });
  const setReturnedFilter = (payload: boolean | null) =>
    dispatch({ type: "SET_RETURNED_FILTER", payload });

  const clearItemFilterOptions = () => {
    setCategoryFilter(null);
    setItemTypeFilter(null);
    setQueryFilter(null);
    setDateLeftFilter(null);
    setDateRightFilter(null);
    setLatitudeFilter(null);
    setLongitudeFilter(null);
    setRangeFilter(null);
    setReturnedFilter(null);
  };

  return (
    <SearchFilterContext.Provider
      value={{
        setItemTypeFilter,
        setCategoryFilter,
        setLatitudeFilter,
        setLongitudeFilter,
        setDateLeftFilter,
        setDateRightFilter,
        setRangeFilter,
        setReturnedFilter,
        setQueryFilter,
        itemFilterOptionsState,
        clearItemFilterOptions,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

export const useSearchFilter = () => {
  const context = useContext(SearchFilterContext);
  if (context === undefined) {
    throw new Error(
      "useSearchFilter must be used within an SearchFilterProvider"
    );
  }
  return context;
};
