import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchStyle from "./Search.styles";
import * as Icon from "react-native-feather";

import { factor } from "../../utils/stylesUtils";

import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export default function Search() {
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
              onLongPress={() => {
                itemFilterOptions.clearItemFilterOptions();
              }}
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
          </View>
          <View style={SearchStyle.filtersContainer}>
            <TouchableOpacity onPress={() => navigateToRout("MoreFilters")}>
              <View style={SearchStyle.moreFiltersContainer}>
                <Icon.PlusCircle
                  color={"#6B240C"}
                  width={25 * factor}
                  height={25 * factor}
                  strokeWidth={3}
                />
                <Text style={SearchStyle.moreFiltersContainerText}>
                  More Filters
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }
    </>
  );
}
