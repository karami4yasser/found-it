import { StyleSheet } from "react-native";

import { factor } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
const FeedbackStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    minHeight: 100 * factor,
    marginVertical: 5,
    marginHorizontal: 10 / factor,
    paddingVertical: 5 * factor,
    borderRadius: 10 * factor,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  image: {
    margin: 3 * factor,
    height: 30 * factor,
    width: 30 * factor,
    borderRadius: 90,
    alignSelf: "center",
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    paddingVertical: 10 * factor,
    flex: 2,
    fontWeight: "700",
    color: "#000000",
    fontSize: 13 * factor,
  },
  rating: {
    paddingVertical: 10 * factor,
    flex: 2,
    fontWeight: "700",
    color: "#000000",
    fontSize: 17 * factor,
    textAlign: "right",
  },
  starContainer: {
    flex: 1,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bottomContainer: {
    flex: 3,
    flexDirection: "column",
    paddingHorizontal: 20 * factor,
  },
  comment: {
    textAlign: "left",
    color: COLORS.black,
    fontSize: 15 * factor,
    paddingVertical: 10 * factor,
  },
  moreLess: {
    color: COLORS.tertiary,
    fontWeight: "700",
    fontSize: 17 * factor,
    textAlign: "left",
  },
});

export default FeedbackStyle;
