import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { factor } from "../../utils/stylesUtils";

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: "row",
    color: COLORS.white,
    width: 250 * factor,
    height: 50 * factor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tertiary,
    borderRadius: 15 * factor,
    paddingHorizontal: 10 * factor,
  },
  buttonText: {
    fontSize: SIZES.medium * factor,
    color: COLORS.white,
    fontWeight: "700",
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default styles;
