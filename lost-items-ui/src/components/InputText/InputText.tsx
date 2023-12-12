import { Text, TextInput } from "react-native";
import React from "react";
import postItemStyles from "./InputText.postItem.styles";
import signInStyles from "./InputText.signIn.styles";
import { View } from "react-native";

type InputTextPropsType = {
  setValue: (value: string) => void;
  currentValue: string;
  placeholder: string;
  type: any;
  hasError: boolean;
  numberOfLines?: number;
  page: "postItem" | "signIn";
};

export default function InputText(
  props: InputTextPropsType
) {
  const styles = (props.page === "postItem") ? postItemStyles : signInStyles;
  const inputStyles = [styles.inputContainer];

  if (props.hasError) {
    inputStyles.push(styles.inputError); //style for the red border
  }
  return (
    <TextInput
      multiline={props.numberOfLines ? true : false}
      numberOfLines={props.numberOfLines}
      style={inputStyles}
      placeholder={props.placeholder}
      onChangeText={props.setValue}
      value={props.currentValue}
      keyboardType={props.type}

    />
  );
}
