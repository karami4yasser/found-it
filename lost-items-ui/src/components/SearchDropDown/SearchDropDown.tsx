import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import styles from "./SearchDropDown.styles";

export type DropDownProps = {
  options: string[];
  onOptionSelected: (option: string) => void;
  placeholder: string;
  hasError?: boolean;
};

const Dropdown = (props: DropDownProps) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(props.options);
  const searchDropDownContainer = [styles.searchDropDownContainer];
  const searchDropDownSearch = [styles.searchDropDownSearch];

  if (props.hasError) {
    searchDropDownContainer.push(styles.searchDropDownContainerError); //style for the red border
    searchDropDownSearch.push(styles.searchDropDownSearchError); //style for the red border
  }

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
        style={searchDropDownSearch}
      />
      <FlatList
        data={filteredOptions}
        scrollEnabled={true}
        style={searchDropDownContainer}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onOptionPress(item)}
            style={styles.searchDropDownItem}
          >
            <Text style={styles.searchDropDownText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Dropdown;
