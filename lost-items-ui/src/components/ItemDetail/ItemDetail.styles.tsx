import { StyleSheet } from "react-native";

import { bigFactor, factor } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
const ItemDetailsStyle = StyleSheet.create({
  itemImageContainer: {
    marginTop: 120 * factor,
    marginBottom: 30,
    alignSelf: "center",
  },
  itemImage: {
    width: factor == 1 ? 240 : 360,
    height: factor == 1 ? 240 : 360,
  },
  textDetailsContainer: {
    flexDirection: "column",
    marginHorizontal: 40,
    borderBottomColor: COLORS.tertiary,
    borderBottomWidth: 1,
    paddingBottom: 30,
  },
  textBigBlack: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.black,
    flex: 1,
  },
  textBigTertiary: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.tertiary,
    flex: 2,
  },
  textSmallTertiary: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.tertiary,
    flex: 1,
  },
  textSmallBlack: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.black,
    flex: 1,
  },

  extraInfoDetailsContainer: {
    flexDirection: "row",
    marginHorizontal: 40,
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
    borderTopColor: COLORS.tertiary,
    borderTopWidth: 1,
    paddingTop: 5,
    marginHorizontal: 40,
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
    width: factor == 1 ? 56 : 360,
    height: factor == 1 ? 56 : 360,
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
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.tertiary,

    paddingBottom: 20,
  },
  textItemValue: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
    paddingBottom: 20,
  },
});

export default ItemDetailsStyle;
