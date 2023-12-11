import { Pressable, Text, View } from "react-native";
import React from "react";
import styles from "./ButtonWithIcon.styles";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../styles/theme";
import { IconName } from "../../typing/global";
import { factor } from "../../screens/PostItem/PostItem.styles";

type ButtonWithIconProps = {
  name: string;
  icon: IconName;
  handleFunction: () => void;
};
export default function RoundedButton(props: ButtonWithIconProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.iconButton}
        onPress={props.handleFunction}
      >
          <FontAwesome name={props.icon} size={15 * factor} color={COLORS.black} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{props.name}</Text>
      </Pressable>
    </View>
  );
}
