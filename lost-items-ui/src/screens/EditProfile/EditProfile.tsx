import { ParamListBase, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import EditProfileStyle from "./EditProfile.styles";
import * as Icon from "react-native-feather";
import { FontAwesome } from "@expo/vector-icons"; // You might need to install the FontAwesome package

import { factor } from "../../utils/stylesUtils";
import { COLORS, SIZES } from "../../styles/theme";
import { TouchableOpacity } from "react-native";
import { UpdateUserApiCall } from "../../api/user/UpdateUserApiCall";
import { useAuth } from "../../utils/AuthProvider";
import Toaster from "../../utils/Toaster";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  validatingFieldsEditProfile,
  validatingFieldsSignUp,
} from "../../utils/ValidationFields";
import InputText from "../../components/InputText/InputText";
import { RootStackParamList } from "../../../App";

export type UpdateUserDetailsForm = {
  firstName: string;
  lastName: string;
  phone: string;
};
type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;
export function EditProfile(nav: EditProfileProps) {
  const currentUser = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [updateUserDetailsForm, setUpdateUserDetailsForm] =
    useState<UpdateUserDetailsForm>({
      firstName: nav.route.params.firstName ? nav.route.params.firstName : "",
      lastName: nav.route.params.lastName ? nav.route.params.lastName : "",
      phone: nav.route.params.phone ? nav.route.params.phone : "",
    });
  const [firstNameHasError, setFirstNameHasError] = useState<boolean>(false);
  const [lastNameHasError, setLastNameHasError] = useState<boolean>(false);
  const [phoneHasError, setphoneHasError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };

  const handleUpdateUserDetails = useCallback(async () => {
    if (
      validatingFieldsEditProfile({
        editUserDetailsForm: updateUserDetailsForm,
        setFirstNameHasError: setFirstNameHasError,
        setLastNameHasError: setLastNameHasError,
        setphoneHasError: setphoneHasError,
      })
    ) {
      setLoading(true);
      const updateUserResponsee = await UpdateUserApiCall(
        {
          firstName: updateUserDetailsForm.firstName,
          lastName: updateUserDetailsForm.lastName,
          phone: updateUserDetailsForm.phone,
        },
        currentUser.accessToken
      );
      if (updateUserResponsee === undefined) {
        setLoading(false);
        Toaster.show("Update User Error!", 1500, true, COLORS.red);
      } else if (updateUserResponsee.status === 200) {
        setLoading(false);
        Toaster.show(
          "You have successfully updated profile details.",
          1500,
          true,
          COLORS.green
        );
        navigateToRout("TabNavigation");
      } else if (updateUserResponsee.status === 409) {
        setLoading(false);
        Toaster.show(updateUserResponsee.data.message, 1500, true, COLORS.red);
      } else if (updateUserResponsee.status === 400) {
        setLoading(false);
        updateUserResponsee.data.errors.forEach((err: string) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
      } else {
        setLoading(false);
        Toaster.show("Update User Error!", 1500, true, COLORS.red);
      }
    }
  }, [updateUserDetailsForm]);

  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
      <View style={EditProfileStyle.titleContainer}>
        <Text style={EditProfileStyle.LargeTitle}>Edit Profile</Text>
      </View>
      <View>
        <Image
          //source={{ uri: props.itemOverviewDto.image }}
          source={{
            uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png",
          }}
          style={EditProfileStyle.image}
        />
        <Text
          style={EditProfileStyle.editImage}
          onPress={() => console.log("camera wowo")}
        >
          <TouchableOpacity>
            <Icon.Camera
              color={COLORS.black}
              width={25 * factor}
              height={25 * factor}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          marginTop: "5%",
          width: "90%",
          maxWidth: 700,
        }}
      >
        <View style={EditProfileStyle.inputContainer}>
          <Text style={EditProfileStyle.inputLabelText}>First Name</Text>
          <InputText
            hasError={firstNameHasError}
            currentValue={updateUserDetailsForm.firstName}
            setValue={(value) =>
              setUpdateUserDetailsForm({
                ...updateUserDetailsForm,
                firstName: value,
              })
            }
            placeholder="First Name"
            type={"default"}
          />
        </View>
        <View style={EditProfileStyle.inputContainer}>
          <Text style={EditProfileStyle.inputLabelText}>Last Name</Text>
          <InputText
            hasError={lastNameHasError}
            currentValue={updateUserDetailsForm.lastName}
            setValue={(value) =>
              setUpdateUserDetailsForm({
                ...updateUserDetailsForm,
                lastName: value,
              })
            }
            placeholder="Last Name"
            type={"default"}
          />
        </View>
        <View style={EditProfileStyle.inputContainer}>
          <Text style={EditProfileStyle.inputLabelText}>Phone Number</Text>
          <InputText
            hasError={phoneHasError}
            currentValue={updateUserDetailsForm.phone}
            setValue={(value) =>
              setUpdateUserDetailsForm({
                ...updateUserDetailsForm,
                phone: value,
              })
            }
            placeholder="Phone number"
            type={"default"}
          />
        </View>
        {/*         <View style={EditProfileStyle.inputContainer}>
          <Text style={EditProfileStyle.inputLabelText}>New Password</Text>
          <PasswordInputWithToggle
            hasError={passwordHasError}
            showPassword={showPassword}
            password={updateUserDetailsForm.password}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            setValue={(value) =>
              setUpdateUserDetailsForm({
                ...updateUserDetailsForm,
                password: value,
              })
            }
            type={"default"}
          />
        </View> */}
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "5%",
          justifyContent: "center",
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={handleUpdateUserDetails}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: factor == 1 ? SIZES.medium : SIZES.xLarge,
              fontWeight: "500",
              backgroundColor: COLORS.tertiary,
              paddingVertical: 15,
              paddingHorizontal: 25,
              borderColor: COLORS.tertiary,
              borderWidth: 2,
              borderRadius: 20,
            }}
          >
            Save changes
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "5%",
          justifyContent: "center",
          borderRadius: 25,
        }}
      ></View>
      <View
        style={{
          flex: 1,
          backgroundColor: "yellow",
        }}
      ></View>
      <Text
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          marginTop: factor == 1 ? 90 : 100,
          marginLeft: "10%",
          alignItems: "center",
        }}
        onPress={() => navigateToRout("TabNavigation")}
      >
        {/* <Icon.SkipBack fontSize={20} color={COLORS.tertiary} /> */}
        <FontAwesome
          name={"chevron-left"}
          size={factor == 1 ? 30 : 40}
          color={COLORS.tertiary}
        />
      </Text>
    </SafeAreaView>
  );
}
