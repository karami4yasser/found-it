import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../styles/theme";
import { bigFactor, factor } from "../../utils/stylesUtils";

const EditProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: COLORS.lightWhite,
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: "5%",
  },
  LargeTitle: {
    color: COLORS.tertiary,
    fontSize: SIZES.xLarge,
    fontWeight: "700",
  },
  image: {
    width: factor == 1 ? 140 : 240,
    height: factor == 1 ? 140 : 240,
    borderRadius: 200,
    borderColor: COLORS.tertiary,
    borderWidth: 2,
    marginTop: "7%",
  },
  editImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
    marginRight: 15 * bigFactor,
  },
  inputLabelText: {
    marginHorizontal: "10%",
    color: COLORS.tertiary,
    fontSize: factor == 1 ? SIZES.small : SIZES.xLarge,
    fontWeight: "700",
  },
  inputContainer: {
    flex: 1,
  },
});

export default EditProfileStyle;
