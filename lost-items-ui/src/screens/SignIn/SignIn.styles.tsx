import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";

const SignInStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: COLORS.lightWhite,
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: "20%",
  },
  formContainer: {
    alignItems: "center",
    paddingVertical: 80,
  },
  SignInButtonContainer: {
    flexDirection: "row",
    paddingTop: 30,
  },
});

export default SignInStyle;
