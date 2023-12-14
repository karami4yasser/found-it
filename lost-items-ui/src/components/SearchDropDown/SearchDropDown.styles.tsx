import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";
import { factor } from "../../utils/stylesUtils";
const SearchDropDownStyles = StyleSheet.create({
  searchDropDownSearch: {
    backgroundColor: COLORS.white,
    height: 30 * factor,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.grayDark,
    borderWidth: 1 * factor,
    borderRadius: 8 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    marginBottom: -2 * factor,
    fontSize: 13 * factor,
    borderBottomColor: COLORS.white,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  searchDropDownContainer: {
    backgroundColor: COLORS.white,
    height: 60 * factor,
    borderColor: COLORS.grayDark,
    borderWidth: 1 * factor,
    borderRadius: 8 * factor,
    paddingLeft: 8 * factor,
    paddingRight: 8 * factor,
    fontSize: 13 * factor,
    borderTopColor: COLORS.white,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  searchDropDownItem: { padding: 0 },
  searchDropDownText: { fontSize: 13 * factor },
});

export default SearchDropDownStyles;
