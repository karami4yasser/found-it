import { StyleSheet } from "react-native";

import { COLORS, FONT_WEIGHT, SIZES } from "./theme";

const globalStyles = StyleSheet.create({
  //Titles
  LargeTitle: {
    color: COLORS.black,
    fontSize: SIZES.xxLarge,
  },
  SemiLargeTitle: {
    color: COLORS.black,
    fontSize: SIZES.xxLarge,
    fontWeight: FONT_WEIGHT.Semibold,
    textAlign: "center",
  },
  MeduimTitle: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontWeight: FONT_WEIGHT.Semibold,
  },
  link: {
    color: COLORS.tertiary,
    fontWeight: FONT_WEIGHT.Semibold,
  },
  //Containers
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: COLORS.lightWhite,
    width: "100%",
  },
});

export default globalStyles;
