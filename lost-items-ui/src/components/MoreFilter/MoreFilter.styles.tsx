import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { factor, width } from "../../utils/stylesUtils";
const MoreFilterStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: 90 * factor,
    marginHorizontal: width * 0.1,
  },
  postItemSwitchSelector: {
    flex: 2,
    //backgroundColor: "blue",
    alignItems: "center",
  },
  searchDropDown: {
    flex: 1,
    ///backgroundColor: "red",
    justifyContent: "center",
  },
  date: {
    flex: 2,
    flexDirection: factor == 1 ? "column" : "row",
    alignItems: factor == 1 ? "center" : "flex-start",
    justifyContent: factor == 1 ? "flex-start" : "space-between",
  },
  iconCalendar: {
    justifyContent: "center",
  },
  datePicker: {
    backgroundColor: COLORS.grayLight,
    marginHorizontal: 20 * factor,
    marginBottom: factor == 1 ? 220 : 100,
    borderRadius: 20 * factor,
  },
  locationFilter: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "blue",
  },
  text: {
    fontSize: 20 * factor,
    fontWeight: "900",
    color: COLORS.black,
  },
  dateText: {
    fontSize: 15 * factor,
    fontWeight: "900",
    color: COLORS.black,
    textAlign: "center",
  },
  saveButtonText: {
    fontSize: 15 * factor,
    fontWeight: "900",
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: "#6B240C",
    justifyContent: "center",

    alignItems: "center",
    width: 0.3 * width,
    minHeight: 40,
    borderRadius: 30 * factor,
    alignSelf: "center",
  },
});

export default MoreFilterStyle;
