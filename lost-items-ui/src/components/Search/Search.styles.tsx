import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { factor } from "../../utils/stylesUtils";

const SearchStyle = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    height: 40 * factor,
    borderColor: "#6B240C",
    borderWidth: 2 * factor,
    borderRadius: 20 * factor,
    alignItems: "center",
    paddingRight: 30 * factor,
    paddingLeft: 15 * factor,
    marginHorizontal: 30 * factor * factor,
    marginTop: 20,
  },
  inputContainer: {
    borderColor: COLORS.primary,
    paddingLeft: 10 * factor,
    fontSize: 15 * factor,
  },
  searchIcon: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 20 * factor,
  },
  container: {
    flexDirection: "column",
  },
  filtersContainer: {
    fontSize: 12 * factor,
    fontWeight: "700",
    flexDirection: "row",
    marginTop: 15 * factor,
    height: 40 * factor,
    marginHorizontal: 10 * factor,
    borderRadius: 20 * factor,
    justifyContent: "flex-end",
  },
  moreFiltersContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40 * factor,
    borderColor: "#6B240C",
    borderWidth: 2 * factor,
    borderRadius: 20 * factor,
    marginHorizontal: 15 * factor * factor * factor,
    paddingHorizontal: 10 * factor,
  },
  moreFiltersContainerText: {
    fontSize: 15 * factor,
    fontWeight: "900",
    color: "#6B240C",
    marginLeft: 10 * factor,
  },
});

export default SearchStyle;
