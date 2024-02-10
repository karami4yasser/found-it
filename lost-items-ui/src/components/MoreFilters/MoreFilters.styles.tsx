import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";
import { bigFactor, factor, height, width } from "../../utils/stylesUtils";
const MoreFilterStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: 90 * factor,
    marginHorizontal: width * 0.1,
    marginBottom: 40 * factor,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  arrowBack: {
    flex: 1,
    maxWidth: 40 * factor,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    height: 35 * factor,
  },
  HeaderCenter: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  ButtonClickheader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.alphaTertary,
    height: 30 * factor,
    maxWidth: 100 * factor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  BoldText: {
    fontSize: 17 * factor * factor,
    fontWeight: "500",
  },
  containerWithTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 25,
  },

  ContainerName: {
    flex: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  scrollingContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  scrollingContentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: height * 0.7,
  },
  postItemSwitchSelector: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  ButtonClick: {
    flex: 1,
    marginHorizontal: 4 * factor,
    justifyContent: "center",
    backgroundColor: COLORS.white,
    height: 35 * factor * factor,
    borderRadius: 10 * factor,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  textButton: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 15 * factor * factor,
    fontWeight: "500"
  },
  searchDropDown: {
    flex: 1,
    //backgroundColor: "red",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20 * factor * factor,
  },
  date: {
    flex: 2,
    flexDirection: "column",
    width: "90%",
    alignContent: "center",
  },
  dateOption: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5 * factor * factor,
  },
  dateOptionContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: .7,
    borderColor: COLORS.grayDark,
    borderRadius: 10 * factor,
    paddingVertical: 2,
    height: 27 * factor * factor,
  },
  iconCalendar: {
    justifyContent: "center",
    paddingHorizontal: 20,
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
  },
  text: {
    fontSize: 20 * factor,
    fontWeight: "900",
    color: COLORS.black,
  },
  dateText: {
    fontSize: 12 * factor * factor,
    fontWeight: "400",
    color: COLORS.black,
    textAlign: "left",
    alignSelf: "center",
    width: "60%",
  },
  saveButtonText: {
    fontSize: 15 * factor * factor,
    fontWeight: "700",
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.tertiary,
    justifyContent: "center",
    alignItems: "center",
    width: 0.4 * width,
    height: 40 * factor * factor,
    alignSelf: "center",
    borderRadius: 10 * factor
  },
  postItemPositionInfoContainer: {
    flex: 1,
    paddingHorizontal: 6 * bigFactor,
    width: "100%",
    marginHorizontal: 20 * factor,
    /* height: 80 * factor, */
    /*     backgroundColor: "red", */
  },
  postItemCoordinates: {
    flex: 2,
    flexDirection: "row",
    alignContent: "space-between",
    paddingVertical: 5 * factor,
  },
  postItemTAR: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    paddingBottom: 10 * factor * factor,
  },
  postItemKVKey: {
    flex: 1,
    fontSize: 12 * factor * factor,
    fontWeight: "700",
    alignItems: "flex-start",
    paddingBottom: 10,
  },
  postItemKVValue: {
    flex: 1,
    fontSize: 12 * factor * factor,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  postItemKVValue2: {
    flex: 1,
    fontSize: 12 * factor * factor,
    color: COLORS.tertiary,
    fontWeight: "500",
    marginLeft: 40 * factor,
  },
});

export default MoreFilterStyle;
