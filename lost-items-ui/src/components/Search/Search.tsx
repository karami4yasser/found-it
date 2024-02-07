import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchStyle from "./Search.styles";
import * as Icon from "react-native-feather";

import { factor } from "../../utils/stylesUtils";

import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export default function Search(props: { itemsNumber?: number }) {
  const [query, setQuery] = useState("");
  const itemFilterOptions = useSearchFilter();
  const deferredQuery = query;

  const setQueryFilterOption = () => {
    if (query !== "") {
      itemFilterOptions.setQueryFilter(query);
    } else {
      itemFilterOptions.setQueryFilter(null);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  console.log("Search render");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  return (
    <>
      {
        <View>
          <View style={SearchStyle.searchContainer}>
            <TouchableOpacity
              style={SearchStyle.searchIcon}
              onPress={setQueryFilterOption}
            >
              <Icon.Search
                color={"#6B240C"}
                width={25 * factor}
                height={25 * factor}
                strokeWidth={3}
              />
            </TouchableOpacity>
            <TextInput
              style={SearchStyle.inputContainer}
              placeholder="Search Items"
              onChangeText={(value) => handleQueryChange(value)}
              value={query}
              keyboardType={"default"}
              maxLength={40}
            />
            <TouchableOpacity
              style={SearchStyle.filterIcon}
              onPress={() => navigateToRout("MoreFilters")}
            >
              <Icon.Sliders
                color={"#6B240C"}
                width={25 * factor}
                height={25 * factor}
                strokeWidth={3}
              />
            </TouchableOpacity>
          </View>
          {props.itemsNumber ? (
            <View style={SearchStyle.itemsNumberContainer}>
              <Text style={SearchStyle.itemsNumber}>Found {props.itemsNumber} Items</Text>
            </View>
          ) : null}
        </View>
      }
    </>
  );
}
