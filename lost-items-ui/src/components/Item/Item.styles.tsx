import { StyleSheet } from "react-native";

import { factor } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
const ItemStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 130 * factor,
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8 * factor,
    marginVertical: 5 * factor,
    marginHorizontal: 10 / factor,
    borderRadius: 10 * factor,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5
  },
  imageContainer: {
    flex: 2,
    justifyContent: "space-around",
  },
  itemImage: {
    height: "90%",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
  },
  detailsContainer: {
    flex: 2,
    flexDirection: "column",
    paddingVertical: 8,
  },
  detailsTopContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  returnedContainer: {
    flex: 1,
    marginVertical: 5 * factor,
  },
  bulletSeparator: {
    paddingHorizontal: 5 * factor,
    fontSize: 3 * factor,
    textAlign: "left",
    color: COLORS.grayDark
  },
  addTofav: {
  },
  itemType: {
    color: "#6B240C",
    fontWeight: "700",
    textAlign: "left",
    fontSize: 10 * factor,
  },
  itemDate: {
    flex: 1,
    color: COLORS.grayDark,
    fontWeight: "500",
    fontStyle: "italic",
    textAlign: "left",
    fontSize: 8 * factor,
  },
  detailsBottomContainer: {
    flex: 2.5,
    flexDirection: "row",
    paddingVertical: 15 * factor,
  },
  itemTitle: {
    fontWeight: "500",
    color: "#000000",
    fontSize: 12 * factor,
  },
  itemIsRetuned: {
    color: "#776B5D",
    fontWeight: "500",
    fontStyle: "italic",
    fontSize: 13 * factor,
    textAlign: "left",
  },
});

export default ItemStyle;
