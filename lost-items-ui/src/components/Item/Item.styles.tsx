import { StyleSheet } from "react-native";

import { factor } from "../../utils/stylesUtils";
const ItemStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 100 * factor,
    flex: 1,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10 / factor,
    paddingVertical: 5,
    borderRadius: 10 * factor,
  },
  imageContainer: {
    flex: 1,
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
    flex: 3,
    flexDirection: "row",
  },
  detailsBottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemTitle: {
    flex: 2,
    fontWeight: "700",
    color: "#000000",
    fontSize: 13 * factor,
  },
  itemIsRetuned: {
    flex: 1,
    color: "#776B5D",
    fontWeight: "500",
    fontStyle: "italic",
    fontSize: 13 * factor,
    textAlign: "right",
    paddingRight: 15 * factor,
  },
  itemType: {
    flex: 1,
    color: "#6B240C",
    fontWeight: "700",
    textAlign: "right",
    fontSize: 15 * factor,
  },
  itemDate: {
    flex: 1,
    color: "#000000",
    fontWeight: "500",
    fontStyle: "italic",
    textAlign: "left",
    paddingLeft: 10 * factor,
    fontSize: 12 * factor,
  },
});

export default ItemStyle;
