import { FlashList } from "@shopify/flash-list";
import Item from "../Item/Item";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";
import React, { useState } from "react";
import { useInfiniteQueryCustom } from "../../utils/useInfiniteQueryCustom";
import Loading from "../../screens/Loading/Loading";
import { useSearchFilter } from "../../utils/SearchFilterProvider";

export default function FoundItFeed() {
  const { width, height } = Dimensions.get("window");
  const factor = width * height > 600000 ? 2 : 1;
  const itemFilterOptions = useSearchFilter();

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQueryCustom(itemFilterOptions.itemFilterOptionsState);

  const handleFunction = () => {
    console.log("clicked");
  };

  const handleEndReached = () => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      </View>
    );

  if (isError) return <Text>{error.message}</Text>;

  return (
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
      estimatedFirstItemOffset={20}
      estimatedItemSize={100}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.8}
      ListEmptyComponent={() => <Text>NO DATA</Text>}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <ActivityIndicator
            style={{
              marginTop: 10,
            }}
            size="large"
            color={COLORS.tertiary}
          />
        ) : (
          <></>
        )
      }
    />
  );
}
