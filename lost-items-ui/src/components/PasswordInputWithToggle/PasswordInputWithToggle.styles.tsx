import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";

const PasswordInputWithToggleStyle = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10
  }
  ,
  inputError: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: COLORS.red,
    borderStyle: "dotted",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: "10%",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10
  }
});

export default PasswordInputWithToggleStyle;