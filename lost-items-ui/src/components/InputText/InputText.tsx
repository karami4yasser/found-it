import { TextInput } from "react-native";
import React from "react";
import postItemStyles from "./InputText.postItem.styles";
import signInStyles from "./InputText.signIn.styles";
import addFeedbackStyles from "./InputText.addFeedback.styles";

type InputTextPropsType = {
  setValue: (value: string) => void;
  currentValue: string;
  placeholder: string;
  type: any;
  hasError?: boolean;
  numberOfLines?: number;
  page?: "postItem" | "signIn" | "addFeedback";
};

export default function InputText(
  props: InputTextPropsType
) {
  const styles = (props.page === "postItem") ? postItemStyles : (props.page === "addFeedback") ? addFeedbackStyles : signInStyles;
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
