import { StyleSheet } from "react-native";

import { bigFactor, factor } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
const ProfileDetailsStyle = StyleSheet.create({
  mainContainer: {
    marginTop: 120 * factor,
    flexDirection: "column",
    height: "50%",
    justifyContent: "center",
    marginHorizontal: 50 * bigFactor,
  },
  imageAndName: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  imageContaier: {
    flex: 2,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
  image: {
    width: factor == 1 ? 140 : 240,
    height: factor == 1 ? 140 : 240,
    borderRadius: 200,
    borderColor: COLORS.tertiary,
    borderWidth: 2,
  },
  NameContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  Name: {
    fontSize: 15 * bigFactor,
    fontWeight: "700",
    color: COLORS.tertiary,
    marginTop: 5,
  },
  usersAchiviments: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-around",
  },
  userAchievmentsOptions: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  userAchievmentsOptionNumber: {
    fontSize: 30 * factor,
    fontWeight: "600",
    color: "#242760",
  },
  userAchievmentsOptionText: {
    fontSize: 20 * factor,
    fontWeight: "500",
    color: "#544C4C",
  },

  editOrCreateButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 7,
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
  itemFetchOptions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: factor == 1 ? 1 : 3,
    borderColor: "#CBC4C4",
  },
  buttonsContainer : {
    flex: 1,
  },
  closeContainer: {
    flex: .1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    left: "-10%",
    top: "-20%",
  },
});

export default ProfileDetailsStyle;
