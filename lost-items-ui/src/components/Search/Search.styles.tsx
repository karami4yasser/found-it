import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { bigFactor, factor } from "../../utils/stylesUtils";

const SearchStyle = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    height: 45 * factor,
    borderColor: "#6B240C",
    borderWidth: 1 * factor,
    borderRadius: 40 * factor,
    alignItems: "center",
    paddingRight: 15 * factor,
    paddingLeft: 15 * factor,
    marginHorizontal: 20 * factor * factor,
    marginBottom: 10 * factor,
    marginTop: 60 * factor,
  },
  inputContainer: {
    flex: 1,
    borderColor: COLORS.primary,
    paddingLeft: 10 * factor,
    fontSize: 15 * factor,
  },
  searchIcon: {
    height: "100%",
    justifyContent: "center",
  },
  filterIcon: {
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
  },
  itemsNumberContainer: {
    marginTop: 7 * factor,
    height: 20 * factor,
    marginHorizontal: 40 * factor,
  },
  itemsNumber: {
    fontSize: 15 * factor,
    fontWeight: "700",
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
