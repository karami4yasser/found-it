import { StyleSheet } from "react-native";
import { factor, height } from "../../utils/stylesUtils";

const ReviewsStyles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: height * 0.7,
  },
  headerContainer: {
    flex: .5,
    minHeight: 100 * factor,
    justifyContent: "center",
    marginTop: 20 * factor,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  header: {
    fontSize: 16 * factor,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 10 * factor,
  },
  reviewsContainer: {
    flex: 9,
    width: "100%",
  },
  closeIcon: {
    marginRight: 10 * factor,
    left: "5%",
    position: "absolute",
    top: "42%",
  }
});

export default ReviewsStyles;
