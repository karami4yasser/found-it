import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { factor } from "../../screens/PostItem/PostItem.styles";

const InputTextStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderColor: COLORS.grayDark,
    borderWidth: 1 * factor,
    borderRadius: 8 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    fontSize: 17 * factor,
  },
  inputError: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderColor: COLORS.grayDark,
    borderWidth: 1 * factor,
    borderRadius: 8 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    fontSize: 17 * factor,
  },
});

export default InputTextStyles;
