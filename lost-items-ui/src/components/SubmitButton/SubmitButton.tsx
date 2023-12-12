import { Pressable, Text, View } from "react-native";
import React from "react";
import styles from "./SubmitButton.styles";

type SubmitButtonProps = {
  name: string;
  handleFunction: () => void;
};
export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.submitButton} onPress={props.handleFunction}>
        <Text style={styles.buttonText}>{props.name}</Text>
      </Pressable>
    </View>
  );
}
