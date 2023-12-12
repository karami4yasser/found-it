import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import SearchDropDownStyles from "./SearchDropDown.styles";

export type DropDownProps = {
  options: string[];
  onOptionSelected: (option: string) => void;
  placeholder: string;
};

const Dropdown = (props: DropDownProps) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(props.options);

  const filterOptions = (text) => {
    setSearchText(text);
    setFilteredOptions(
      props.options.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const onOptionPress = (option) => {
    setSearchText(option);
    props.onOptionSelected(option);
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={filterOptions}
        placeholder={props.placeholder}
        style={SearchDropDownStyles.searchDropDownSearch}
      />
      <FlatList
        data={filteredOptions}
        scrollEnabled={true}
        style={SearchDropDownStyles.searchDropDownContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onOptionPress(item)}
            style={SearchDropDownStyles.searchDropDownItem}
          >
            <Text style={SearchDropDownStyles.searchDropDownText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Dropdown;
