import { StyleSheet } from "react-native";

import {
  COLORS,
  FONT_WEIGHT,
  SIZES,
} from "../../styles/theme";
import { factor } from "../../screens/PostItem/PostItem.styles";


const styles = StyleSheet.create({
  iconButton : {
    flexDirection: "row",
    color: COLORS.white,
    width: 130 * factor,
    height: 23 * factor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10 * factor,
    borderColor: COLORS.primary,
    borderWidth: .6 * factor,
  },
  buttonText: {
    fontSize: SIZES.small * factor,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  buttonIcon: {
    marginRight: 10 * factor,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  }
});

export default styles;
