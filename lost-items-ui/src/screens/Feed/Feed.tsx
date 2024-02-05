import React, { useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";

import Search from "../../components/Search/Search";

import FoundItFeed from "../../components/FoundItFeed/FoundItFeed";
import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { getItemsInfiniteQuery } from "../../api/item/GetItemsInfiniteQuery";
import { COLORS } from "../../styles/theme";

export default function Feed() {
  console.log("feed render");

  useEffect(() => {
    LogBox.ignoreLogs(["AxiosError: Network Error"]);
  }, []);
  const itemFilterOptions = useSearchFilter();
  const result = getItemsInfiniteQuery(
    itemFilterOptions.itemFilterOptionsState,
    null
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Search itemsNumber={result.data?.pages.at(0)?.totalResults}/>
      <FoundItFeed result={result} />
    </SafeAreaView>
  );
}
