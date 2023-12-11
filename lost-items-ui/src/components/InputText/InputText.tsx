import { TextInput } from "react-native";
import React from "react";
import InputTextStyles from "./InputText.styles";

type InputTextPropsType = {
  setValue: (value: string) => void;
  currentValue: string;
  placeholder: string;
  type: any;
  hasError: boolean;
  numberOfLines?: number;
};

export default function InputText(
  props: InputTextPropsType
) {
  const inputStyles = [InputTextStyles.inputContainer];

  if (props.hasError) {
    inputStyles.push(InputTextStyles.inputError); //style for the red border
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
