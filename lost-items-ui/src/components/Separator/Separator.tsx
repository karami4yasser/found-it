import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  separatorOffset: {
    flex: 0.5,
    flexDirection: "row",
  },
  separator: {
    borderColor: COLORS.primary,
    borderWidth: 0.8,
    flex: 8,
    flexDirection: "row",
  },
});

const Separator = () => (
  <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
    <View style={styles.separatorOffset} />
  </View>
);

export default Separator;
