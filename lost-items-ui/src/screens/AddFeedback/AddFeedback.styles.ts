import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";

const { width, height } = Dimensions.get("window");
export const factor = width * height > 600000 ? 2 : 1;
export const bigFactor = width * height > 600000 ? 2.5 : 1;

const AddFeedbackStyles = StyleSheet.create({
  addFeedbackContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: height * 0.7,
  },
  addFeedbackHeadingTitleContainer: {
    flex: 1,
    minHeight: 100 * factor,
    justifyContent: "center",
    marginTop: 20 * factor,
  },
  addFeedbackCommentContainer: {
    flex: 6,
    width: "80%",
    paddingVertical: 60 * bigFactor,
  },
  addFeedbackRatingContainer: {
    flex: 1,
  },
  addFeedbackHeadingTitle: {
    fontSize: 16 * factor,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 10 * factor,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "90%",
  },
  addFeedbackButton: {
    flex: 4,
    backgroundColor: COLORS.tertiary,
    alignItems: "center",
    borderRadius: 10,
    padding: "5%",
    maxWidth: 250,
  },
  addFeedbackButtonText: {
    color: COLORS.white,
    fontSize: 15 * factor * factor,
    fontWeight: "500",
  },
  addFeedbackRating: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  }

});

export default AddFeedbackStyles;
