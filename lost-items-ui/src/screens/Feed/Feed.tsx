import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import Item from "../../components/Item/Item";
import { ItemFilterOptions } from "../../api/item/GetItemsOverviewApiCall";
import { COLORS } from "../../styles/theme";
import Loading from "../Loading/Loading";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import { useInfiniteQueryCustom } from "../../utils/useInfiniteQueryCustom";
export default function Feed() {
  const { width, height } = Dimensions.get("window");
  const factor = width * height > 600000 ? 2 : 1;
  const [totalResult, setTotalResult] = useState(0);
  const [itemFilterOptions, setItemFilterOptions] = useState<ItemFilterOptions>(
    {
      category: null,
      type: null,
      text: null,
      dateLeft: null,
      dateRight: null,
      longitude: null,
      latitude: null,
      range: null,
      returned: null,
    }
  );

  const handleEndReached = () => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQueryCustom(itemFilterOptions);

  const handleFunction = () => {
    console.log("clicked");
  };
  if (isLoading) return <Loading />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashList
        data={data?.pages.flatMap((page) => page.items)}
        contentContainerStyle={{
          padding: 10 * factor,
          paddingBottom: 50,
        }}
        renderItem={({ item }) => (
          <Item
            key={item.id}
            itemOverviewDto={item}
            handleFunction={handleFunction}
          />
        )}
        numColumns={factor}
        estimatedFirstItemOffset={10}
        estimatedItemSize={data ? data.pages[0].totalResults : 100}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={COLORS.tertiary} />
          ) : (
            <></>
          )
        }
      />
    </SafeAreaView>
  );
}
