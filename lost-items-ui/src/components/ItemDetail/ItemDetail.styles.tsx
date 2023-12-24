import { StyleSheet } from "react-native";

import { bigFactor, factor } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
const ItemDetailsStyle = StyleSheet.create({
  itemImageContainer: {
    marginTop: 100 * factor,
    marginBottom: 30,
    alignSelf: "center",
  },
  itemImage: {
    width: factor == 1 ? 240 : 360,
    height: factor == 1 ? 240 : 360,
  },
  textDetailsContainer: {
    flexDirection: "column",
    marginHorizontal: factor == 1 ? 40 : 60,
    /*     borderBottomColor: COLORS.tertiary,
    borderBottomWidth: 1,
    paddingBottom: 30, */
  },
  textBigBlack: {
    fontSize: factor == 1 ? 17 : 25,
    fontWeight: "700",
    color: COLORS.black,
    flex: 1,
    marginBottom: factor == 1 ? 10 : 25,
  },
  textBigTertiary: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.tertiary,
    flex: 2,
  },
  textSmallTertiary: {
    fontSize: factor == 1 ? 15 : 20,
    fontWeight: "700",
    color: COLORS.tertiary,
    flex: 1,
  },
  textSmallBlack: {
    fontSize: factor == 1 ? 15 : 20,
    fontWeight: "500",
    color: COLORS.black,
    flex: 1,
  },

  extraInfoDetailsContainer: {
    flexDirection: "row",
    marginLeft: factor == 1 ? 40 : 60,
    paddingTop: 10,
  },

  extraInfoDetailsItem: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  userContactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    /*     borderTopColor: COLORS.tertiary,
    borderTopWidth: 1,
    paddingTop: 5, */
    marginHorizontal: factor == 1 ? 40 : 60,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    maxWidth: 250,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15 * factor * factor,
    fontWeight: "500",
  },
  userImage: {
    width: factor == 1 ? 56 : 120,
    height: factor == 1 ? 56 : 120,
    borderRadius: 100,
    flex: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.tertiary,
    marginTop: "20%",
  },
  textItemState: {
    fontSize: factor == 1 ? 18 : 30,
    fontWeight: "500",
    color: COLORS.tertiary,
    marginBottom: factor == 1 ? 18 : 50,
    flex: 1,
  },
  textItemValue: {
    fontSize: factor == 1 ? 18 : 30,
    fontWeight: "500",
    color: COLORS.black,
    marginBottom: factor == 1 ? 18 : 50,
    flex: 1,
  },
});

export default ItemDetailsStyle;
