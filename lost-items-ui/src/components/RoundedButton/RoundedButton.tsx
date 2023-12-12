import { Pressable, Text } from "react-native";
import React from "react";
import RoundedButtonStyle from "./RoundedButton.styles";

type RoundedButtonProps = {
  name: string;
  handleFunction: () => void;
};
export default function RoundedButton(props: RoundedButtonProps) {
  return (
    <Pressable
      style={RoundedButtonStyle.RoundedButton}
      onPress={props.handleFunction}
    >
      <Text style={RoundedButtonStyle.textButton}>{props.name}</Text>
    </Pressable>
  );
}
