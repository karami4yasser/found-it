import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You might need to install the FontAwesome package
import PasswordInputWithToggleStyle from "./PasswordInputWithToggle.styles";
type PasswordInputPropsType = {
  showPassword: boolean;
  password: string;
  togglePasswordVisibility: () => void;
  setValue: (value: string) => void;
  type: any;
  hasError: boolean;
};
export default function PasswordInputWithToggle(props: PasswordInputPropsType) {
  const inputStyles = [PasswordInputWithToggleStyle.inputContainer];

  if (props.hasError) {
    inputStyles.push(PasswordInputWithToggleStyle.inputError); //style for the red border
  }
  return (
    <View style={inputStyles}>
      <TextInput
        style={{ flex: 1 }}
        onChangeText={props.setValue}
        value={props.password}
        keyboardType={props.type}
        secureTextEntry={!props.showPassword}
        placeholder="Password"
      />
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={props.togglePasswordVisibility}
      >
        <FontAwesome
          name={props.showPassword ? "eye" : "eye-slash"}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}
