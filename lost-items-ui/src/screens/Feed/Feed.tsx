import React, { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Item from "../../components/Item/Item";
import { ItemOverviewDto } from "../../typing/item";
import {
  GetItemsOverviewApiCall,
  ItemFilterOptions,
} from "../../api/item/GetItemsOverviewApiCall";
import Toaster from "../../utils/Toaster";
import { COLORS } from "../../styles/theme";
import Loading from "../Loading/Loading";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";

export default function Feed() {
  const { width, height } = Dimensions.get("window");
  const factor = width * height > 600000 ? 2 : 1;
  const [data, setData] = useState<ItemOverviewDto[]>([]);
  const [loading, setLoading] = useState(true);
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
  const generateQueryString = (params: ItemFilterOptions): string => {
    const queryParams: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        let paramValue = value;

        // Convert boolean values to lowercase string
        if (key === "returned" && typeof paramValue === "boolean") {
          paramValue = paramValue.toString().toLowerCase();
        }

        queryParams.push(`${key}=${paramValue}`);
      }
    });

    if (queryParams.length > 0) {
      return "?" + queryParams.join("&");
    } else {
      return "";
    }
  };
  const fetchItems = useCallback(
    async (itemFilterOptions: ItemFilterOptions) => {
      const queryString = generateQueryString(itemFilterOptions);
      const itemResponse = await GetItemsOverviewApiCall(queryString);
      if (itemResponse === undefined) {
        setLoading(false);
        console.error(itemResponse);
        Toaster.show("Feed Error undefined!", 1500, true, COLORS.red);
      } else if (itemResponse.status === 200) {
        setData(itemResponse.data);
        setLoading(false);
        Toaster.show("Data Fetched successfully", 1500, true, COLORS.green);
      } else {
        setLoading(false);
        Toaster.show("Error in fetching the data!", 1500, true, COLORS.red);
      }
    },
    [itemFilterOptions]
  );

  useLayoutEffect(() => {
    fetchItems(itemFilterOptions);
  }, [fetchItems]);

  const handleFunction = () => {
    console.log("clicked");
  };
  if (loading) return <Loading />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashList
        data={data}
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
        estimatedItemSize={200}
        numColumns={factor}
      />
    </SafeAreaView>
  );
}
