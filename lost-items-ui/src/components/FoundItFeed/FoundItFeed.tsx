import { FlashList } from "@shopify/flash-list";
import Item from "../Item/Item";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";
import React, { useState } from "react";
import { useInfiniteQueryCustom } from "../../utils/useInfiniteQueryCustom";
import Loading from "../../screens/Loading/Loading";
import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { UseInfiniteQueryResult } from "react-query";
import { ItemOverviewCollection } from "../../typing/item";

type FoundItFeedProps = {
  result: UseInfiniteQueryResult<ItemOverviewCollection, Error>;
};

export default function FoundItFeed({ result }: FoundItFeedProps) {
  const { width, height } = Dimensions.get("window");
  const factor = width * height > 600000 ? 2 : 1;

  const handleFunction = () => {
    console.log("clicked");
  };

  const handleEndReached = () => {
    if (!result.isLoading && result.hasNextPage) {
      result.fetchNextPage();
    }
  };

  if (result.isLoading)
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

  if (result.isError) return <Text>{result.error.message}</Text>;

  return (
    <FlashList
      data={result.data?.pages.flatMap((page) => page.items)}
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
        result.isFetchingNextPage ? (
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
