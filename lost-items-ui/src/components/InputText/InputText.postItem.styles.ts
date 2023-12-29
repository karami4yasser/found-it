import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { factor } from "../../screens/PostItem/PostItem.styles";

const InputTextWithPurpleBackgroundStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "80%",
    borderColor: COLORS.grayDark,
    borderWidth: 1 * factor,
    borderRadius: 8 * factor,
    marginBottom: 10 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    marginTop: 10  * factor,
    fontSize: 13 * factor,
  },
  inputError: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "80%",
    borderColor: COLORS.red,
    borderWidth: 1 * factor,
    borderRadius: 5 * factor,
    marginBottom: 10 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    marginTop: 10 * factor,
    fontSize: 13 * factor,
  },
});

export default InputTextWithPurpleBackgroundStyles;
