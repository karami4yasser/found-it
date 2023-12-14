import { TextInput } from "react-native";
import React from "react";
import InputTextWithPurpleBackgroundStyles from "./InputTextWithPurpleBackground.styles";

type InputTextWithPurpleBackgroundPropsType = {
  setValue: (value: string) => void;
  currentValue: string;
  placeholder: string;
  type: any;
  hasError: boolean;
};

export default function InputTextWithPurpleBackground(
  props: InputTextWithPurpleBackgroundPropsType
) {
  const inputStyles = [InputTextWithPurpleBackgroundStyles.inputContainer];

  if (props.hasError) {
    inputStyles.push(InputTextWithPurpleBackgroundStyles.inputError); //style for the red border
  }
  return (
    <TextInput
      style={inputStyles}
      placeholder={props.placeholder}
      onChangeText={props.setValue}
      value={props.currentValue}
      keyboardType={props.type}
    />
  );
}
