import React, { useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";

import Search from "../../components/Search/Search";

import FoundItFeed from "../../components/FoundItFeed/FoundItFeed";
import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { useInfiniteQueryCustom } from "../../utils/useInfiniteQueryCustom";

export default function Feed() {
  console.log("feed render");

  useEffect(() => {
    LogBox.ignoreLogs(["AxiosError: Network Error"]);
  }, []);
  const itemFilterOptions = useSearchFilter();
  const result = useInfiniteQueryCustom(
    itemFilterOptions.itemFilterOptionsState,
    null
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search />
      <FoundItFeed result={result} />
    </SafeAreaView>
  );
}
