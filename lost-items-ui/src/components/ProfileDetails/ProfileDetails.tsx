import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import ProfileDetailsStyle from "./ProfileDetails.styles";
import { factor } from "../../utils/stylesUtils";
import { State, useSearchFilter } from "../../utils/SearchFilterProvider";
import { ItemType } from "../../typing/item";
import { useAuth } from "../../utils/AuthProvider";
import { useQuery } from "react-query";
import { GetUserDetailsResponseDto } from "../../typing/user";
import { GetCurrentUserDetailsApiCall } from "../../api/user/GetCurrentUserDetailsApiCall";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isTokenExpired } from "../../utils/isTokenExpired";
import Toaster from "../../utils/Toaster";
type profileDetailsProps = {
  setState: React.Dispatch<React.SetStateAction<State>>;
  state: State;
};

export function ProfileDetails({ setState, state }: profileDetailsProps) {
  const currentUser = useAuth();
  const navigationBar = useNavigation<BottomTabNavigationProp<ParamListBase>>();

  const [user, setUser] = useState<GetUserDetailsResponseDto>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isError, setIsError] = useState<boolean>(false);

  /*   const { data, isError, isLoading, error } = useQuery<
    GetUserDetailsResponseDto,
    Error
  >(["items", currentUser], () =>
    GetCurrentUserDetailsApiCall(currentUser.accessToken)
  ); */
  const navigationStack =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigateToRout = (routName: string) => {
    navigationStack.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  const fetchUserDetails = useCallback(async () => {
    if (currentUser.accessToken !== null && currentUser.refreshToken !== "") {
      try {
        if (isTokenExpired(currentUser.accessToken)) {
          if (
            !(await currentUser.autoRefreshAccessToken(
              currentUser.refreshToken
            ))
          ) {
            navigateToRout("SignIn");
          }
        }
        setIsLoading(true);
        const response = await GetCurrentUserDetailsApiCall(
          currentUser.accessToken
        );

        if (response.status === 200) {
          setUser(response.data);
          Toaster.show(
            "User details retrieved successfully.",
            1500,
            true,
            COLORS.green
          );
          currentUser.setTheUserDetails(
            response.data.firstName,
            response.data.lastName,
            response.data.phone
          );
          setIsLoading(false);
        } else if (response.status === 401) {
          Toaster.show(response.data.message, 1500, true, COLORS.red);
          setIsError(true);
          setIsLoading(false);
          navigateToRout("SignIn");
        } else if (response.status === 404) {
          Toaster.show(response.data.message, 1500, true, COLORS.red);
          setIsError(true);
          setIsLoading(false);
          navigateToRout("SignUp");
        } else if (response.status === 400) {
          setIsError(true);
          setIsLoading(false);
          response.data.errors.forEach((err: any) => {
            Toaster.show(err, 1500, true, COLORS.red);
          });
        } else {
          setIsError(true);
          setIsLoading(false);
          Toaster.show("User error!", 1500, true, COLORS.red);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        Toaster.show("User error Error!", 1500, true, COLORS.red);
      }
    }
  }, [
    currentUser.accessToken,
    currentUser.refreshToken,
    currentUser.setTheAccessToken,
  ]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <SafeAreaView style={ProfileDetailsStyle.mainContainer}>
      <View style={ProfileDetailsStyle.imageAndName}>
        <View style={ProfileDetailsStyle.imageContaier}>
          <Image
            //source={{ uri: props.itemOverviewDto.image }}
            source={{
              uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png",
            }}
            style={ProfileDetailsStyle.image}
          />
        </View>

        <View style={ProfileDetailsStyle.NameContainer}>
          <Text style={ProfileDetailsStyle.Name}>
            {isLoading && !isError ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : (
              user?.firstName + " " + user?.lastName
            )}
            {isError ? "error" : null}
          </Text>
        </View>
      </View>
      <View style={ProfileDetailsStyle.usersAchiviments}>
        <View style={ProfileDetailsStyle.userAchievmentsOptions}>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionNumber}
          >
            {isLoading && !isError ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : (
              user?.feedbackStatistics.ratingCount
            )}
            {isError ? "error" : null}
          </Text>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionText}
          >
            Rating
          </Text>
        </View>
        <View style={ProfileDetailsStyle.userAchievmentsOptions}>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionNumber}
          >
            {isLoading && !isError ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : (
              user?.numberOfPosts
            )}
            {isError ? "error" : null}
          </Text>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionText}
          >
            Posts
          </Text>
        </View>
        <View style={ProfileDetailsStyle.userAchievmentsOptions}>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionNumber}
          >
            {isLoading && !isError ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : (
              user?.feedbackStatistics.averageRating
            )}
            {isError ? "error" : null}
          </Text>
          <Text
            numberOfLines={1}
            style={ProfileDetailsStyle.userAchievmentsOptionText}
          >
            stars
          </Text>
        </View>
      </View>
      <View style={ProfileDetailsStyle.editOrCreateButtons}>
        <TouchableOpacity
          style={ProfileDetailsStyle.button}
          onPress={() => navigateToRout("EditProfile")}
        >
          <Text style={ProfileDetailsStyle.buttonText}> Edit Profile</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        ></View>
        <TouchableOpacity
          style={ProfileDetailsStyle.button}
          onPress={() => navigationBar.navigate("Post")}
        >
          <Text style={ProfileDetailsStyle.buttonText}> Create Item</Text>
        </TouchableOpacity>
      </View>
      <View style={ProfileDetailsStyle.itemFetchOptions}>
        <Text
          style={{
            fontSize: 15 * factor * factor,
            color: state?.type == ItemType.FOUND ? COLORS.tertiary : "#9B9494",
            fontWeight: "500",
          }}
          onPress={() =>
            setState({
              type: ItemType.FOUND,
              text: null,
              category: null,
              dateLeft: null,
              dateRight: null,
              longitude: null,
              latitude: null,
              range: null,
              returned: null,
            })
          }
        >
          Found Items
        </Text>
        <Text
          style={{
            fontSize: 15 * factor * factor,
            color: state?.type == ItemType.LOST ? COLORS.tertiary : "#9B9494",
            fontWeight: "500",
          }}
          onPress={() =>
            setState({
              type: ItemType.LOST,
              text: null,
              category: null,
              dateLeft: null,
              dateRight: null,
              longitude: null,
              latitude: null,
              range: null,
              returned: null,
            })
          }
        >
          Lost Items
        </Text>
      </View>
    </SafeAreaView>
  );
}
