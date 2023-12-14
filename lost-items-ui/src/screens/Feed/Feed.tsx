import React, { useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";

import Search from "../../components/Search/Search";

import FoundItFeed from "../../components/FoundItFeed/FoundItFeed";

export default function Feed() {
  console.log("feed render");

  useEffect(() => {
    LogBox.ignoreLogs(["AxiosError: Network Error"]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search />
      <FoundItFeed />
    </SafeAreaView>
  );
}
