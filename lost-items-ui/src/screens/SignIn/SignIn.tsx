import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import PasswordInputWithToggle from "../../components/PasswordInputWithToggle/PasswordInputWithToggle";
import SignInStyle from "./SignIn.styles";
import InputText from "../../components/InputText/InputText";
import globalStyles from "../../styles/globalStyles";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toaster from "../../utils/Toaster";
import { COLORS } from "../../styles/theme";
import { SigninApiCall } from "../../api/auth/SigninApiCall";
import { useAuth } from "../../utils/AuthProvider";
import Loading from "../Loading/Loading";
import GoogleAuthButton from "../../components/GoogleAuthButton/GoogleAuthButton";
import { validatingFieldsSignIn } from "../../utils/ValidationFields";

export default function SignIn() {
  type SignInForm = {
    emailOrPhone: string;
    password: string;
  };
  const [signInForm, setSignInForm] = useState<SignInForm>({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [PhoneNumberEmailHasError, setPhoneNumberEmailHasError] =
    useState(false);
  const [PasswordHasError, setPasswordHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  const currentUser = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignIn = useCallback(async () => {
    if (
      validatingFieldsSignIn({
        signInForm: signInForm,
        setPhoneNumberEmailHasError: setPhoneNumberEmailHasError,
        setPasswordHasError: setPasswordHasError,
      })
    ) {
      setLoading(true);
      const AuthResponse = await SigninApiCall({
        emailOrPhone: signInForm.emailOrPhone,
        password: signInForm.password,
      });
      if (AuthResponse === undefined) {
        setLoading(false);
        console.error(AuthResponse);
        Toaster.show("Sign In Error undefined!", 1500, true, COLORS.red);
      } else if (AuthResponse.status === 200) {
        currentUser.setTheAccessToken(AuthResponse.data.accessToken);
        currentUser.setTheRefreshToken(AuthResponse.data.refreshToken);
        setLoading(false);
        Toaster.show(
          "You have successfully signed up.",
          1500,
          true,
          COLORS.green
        );
        navigateToRout("TabNavigation");
      } else if (AuthResponse.status === 401) {
        setLoading(false);
        Toaster.show("Bad credentials.", 1500, true, COLORS.red);
      } else if (AuthResponse.status === 400) {
        setLoading(false);
        AuthResponse.data.errors.forEach((err: string) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
      } else {
        setLoading(false);
        Toaster.show("Sign In Error!", 1500, true, COLORS.red);
      }
    }
  }, [signInForm]);

  const handleNavigateSignUp = () => {
    navigation.navigate("SignUp");
  };
  const setSignInFormItem = useCallback(
    (fieldName: string, value: any) => {
      setSignInForm((prevSignInForm) => ({
        ...prevSignInForm,
        [fieldName]: value,
      }));
    },
    [setSignInForm]
  );
  return (
    <View style={SignInStyle.container}>
      {loading ? (
        /* Display the Loading component while waiting */
        <Loading />
      ) : (
        /* Display the form elements when not loading */
        <>
          <View style={SignInStyle.titleContainer}>
            <Text style={globalStyles.LargeTitle}>Sign In</Text>
          </View>
          <View style={SignInStyle.formContainer}>
            <InputText
                hasError={PhoneNumberEmailHasError}
                currentValue={signInForm.emailOrPhone}
                setValue={(value) => setSignInFormItem("emailOrPhone", value)}
                placeholder="Email or Phone number"
                type={"default"} page={"signIn"}            />
            <PasswordInputWithToggle
              hasError={PasswordHasError}
              showPassword={showPassword}
              password={signInForm.password}
              togglePasswordVisibility={togglePasswordVisibility}
              setValue={(value) => setSignInFormItem("password", value)}
              type={"default"}
            />

            <View style={SignInStyle.SignInButtonContainer}>
              <RoundedButton name="Sign In" handleFunction={handleSignIn} />
            </View>
            <TouchableOpacity style={{ paddingVertical: 10 }}>
              <Text style={globalStyles.link}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <GoogleAuthButton onPress={() => Toaster.show("Google Auth")} />
          <View style={{ alignItems: "center", marginBottom: "20%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Don't have an account ? </Text>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={handleNavigateSignUp}
              >
                <Text style={globalStyles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
