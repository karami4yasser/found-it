import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SignUpStyle from "./SignUp.styles";
import { COLORS } from "../../styles/theme";
import InputText from "../../components/InputText/InputText";
import PasswordInputWithToggle from "../../components/PasswordInputWithToggle/PasswordInputWithToggle";
import globalStyles from "../../styles/globalStyles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import Loading from "../Loading/Loading";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateUserApiCall } from "../../api/user/CreateUserApiCall";
import Toaster from "../../utils/Toaster";
import { useAuth } from "../../utils/AuthProvider";
import GoogleAuthButton from "../../components/GoogleAuthButton/GoogleAuthButton";
import { validatingFieldsSignUp } from "../../utils/ValidationFields";

export type SignUpForm = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};
export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [FirstNameHasError, setFirstNameHasError] = useState(false);
  const [LastNameHasError, setLastNameHasError] = useState(false);
  const [PhoneNumberHasError, setPhoneNumberHasError] = useState(false);
  const [PasswordHasError, setPasswordHasError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const currentUser = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  const handleSignUp = useCallback(async () => {
    if (
      validatingFieldsSignUp({
        createUserDetailsForm: signUpForm,
        setFirstNameHasError: setFirstNameHasError,
        setLastNameHasError: setLastNameHasError,
        setphoneHasError: setPhoneNumberHasError,
        setPasswordHasError: setPasswordHasError,
      })
    ) {
      setLoading(true);
      const createUserResponse = await CreateUserApiCall({
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        phone: signUpForm.phone,
        password: signUpForm.password,
      });
      if (createUserResponse === undefined) {
        setLoading(false);
        Toaster.show("SignUp Error!", 1500, true, COLORS.red);
      } else if (createUserResponse.status === 201) {
        currentUser.setTheAccessToken(createUserResponse.data.accessToken);
        currentUser.setTheRefreshToken(createUserResponse.data.refreshToken);
        currentUser.setTheUserId(createUserResponse.data.userId);
        setLoading(false);
        Toaster.show(
          "You have successfully signed up.",
          1500,
          true,
          COLORS.green
        );
        navigateToRout("TabNavigation");
      } else if (createUserResponse.status === 409) {
        setLoading(false);
        Toaster.show(createUserResponse.data.message, 1500, true, COLORS.red);
      } else if (createUserResponse.status === 400) {
        setLoading(false);
        createUserResponse.data.errors.forEach((err: string) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
      } else {
        setLoading(false);
        Toaster.show("SignUp Error!", 1500, true, COLORS.red);
      }
    }
  }, [signUpForm]);

  const setSignUpFormItem = useCallback(
    (fieldName: string, value: any) => {
      setSignUpForm((prevSignUpForm) => ({
        ...prevSignUpForm,
        [fieldName]: value,
      }));
    },
    [setSignUpForm]
  );
  return (
    <View style={SignUpStyle.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={SignUpStyle.titleContainer}>
            <Text style={globalStyles.LargeTitle}>Sign Up</Text>
          </View>
          <View style={SignUpStyle.formContainer}>
            <View style={SignUpStyle.formFullName}>
              <InputText
                currentValue={signUpForm.firstName}
                setValue={(value) => setSignUpFormItem("firstName", value)}
                placeholder="First Name"
                type={"default"}
                page="signIn"
                hasError={FirstNameHasError}
              />
              <InputText
                currentValue={signUpForm.lastName}
                setValue={(value) => setSignUpFormItem("lastName", value)}
                placeholder="Last Name"
                type={"default"}
                page="signIn"
                hasError={LastNameHasError}
              />
            </View>
            <InputText
              currentValue={signUpForm.phone}
              setValue={(value) => setSignUpFormItem("phone", value)}
              placeholder="Phone Number"
              type={"default"}
              page="signIn"
              hasError={PhoneNumberHasError}
            />
            <PasswordInputWithToggle
              showPassword={showPassword}
              password={signUpForm.password}
              togglePasswordVisibility={togglePasswordVisibility}
              setValue={(value) => setSignUpFormItem("password", value)}
              type={"default"}
              hasError={PasswordHasError}
            />
            <View style={SignUpStyle.SignInButtonContainer}>
              <RoundedButton name="Sign Up" handleFunction={handleSignUp} />
            </View>
          </View>
          <GoogleAuthButton onPress={() => Toaster.show("Google Auth")} />
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Already have an account ? </Text>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={globalStyles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
