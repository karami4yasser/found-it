import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import ProfileDetailsStyle from "./ProfileDetails.styles";
import { factor } from "../../utils/stylesUtils";
import { State } from "../../utils/SearchFilterProvider";
import { ItemType } from "../../typing/item";
import { useAuth } from "../../utils/AuthProvider";
import { GetUserDetailsResponseDto } from "../../typing/user";
import { GetCurrentUserDetailsApiCall } from "../../api/user/GetCurrentUserDetailsApiCall";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { isTokenExpired } from "../../utils/isTokenExpired";
import Toaster from "../../utils/Toaster";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../../App";

type ProfileDetailsProps = {
  setState: React.Dispatch<React.SetStateAction<State>>;
  state: State;
  userId?: string;
};
export function ProfileDetails({
  setState,
  state,
  userId,
}: ProfileDetailsProps) {
  const currentUser = useAuth();
  const navigationBar = useNavigation<BottomTabNavigationProp<ParamListBase>>();
  const [user, setUser] = useState<GetUserDetailsResponseDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const navigationStack =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigateToRout = (routName: string) => {
    navigationStack.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  const fetchUserDetails = useCallback(async () => {
    try {
      if (
        currentUser.accessToken !== null &&
        currentUser.refreshToken !== "" &&
        currentUser.userId == userId &&
        isTokenExpired(currentUser.accessToken)
      ) {
        if (
          !(await currentUser.autoRefreshAccessToken(currentUser.refreshToken))
        ) {
          currentUser.clearTokens();
          navigateToRout("TabNavigation");
        }
      }
      setIsLoading(true);
      const response = await GetCurrentUserDetailsApiCall(
        currentUser.accessToken,
        userId
      );

      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      } else if (response.status === 401) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setIsError(true);
        setIsLoading(false);
        currentUser.clearTokens();
        navigateToRout("TabNavigation");
      } else if (response.status === 404) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setIsError(true);
        setIsLoading(false);
        currentUser.clearTokens();
        navigateToRout("SignUp");
      } else if (response.status === 400) {
        setIsError(true);
        setIsLoading(false);
        currentUser.clearTokens();
        response.data.errors.forEach((err: any) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
      } else {
        setIsError(true);
        setIsLoading(false);
        currentUser.clearTokens();
        Toaster.show("User error!", 1500, true, COLORS.red);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      currentUser.clearTokens();
      Toaster.show("User error Error!", 1500, true, COLORS.red);
    }
  }, [userId, currentUser.accessToken, currentUser.refreshToken]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <SafeAreaView style={ProfileDetailsStyle.mainContainer}>
      {userId ? (
        <View style={ProfileDetailsStyle.closeContainer}>
          <FontAwesome
            name={"close"}
            size={30 * factor}
            color={COLORS.black}
            onPress={() => navigationStack.goBack()}
          />
        </View>
      ) : undefined}
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
            Reviews
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
            Rating
          </Text>
        </View>
      </View>
      <View style={ProfileDetailsStyle.buttonsContainer}>
        {userId &&
        currentUser.accessToken &&
        currentUser.accessToken !== "" &&
        userId !== currentUser.userId ? (
          <View style={ProfileDetailsStyle.editOrCreateButtons}>
            <TouchableOpacity
              style={ProfileDetailsStyle.button}
              onPress={() =>
                navigationBar.navigate("AddFeedback", { userId: userId })
              }
            >
              <Text style={ProfileDetailsStyle.buttonText}> Add Feedback</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}
            ></View>
            <TouchableOpacity
              style={ProfileDetailsStyle.button}
              onPress={() =>
                navigationBar.navigate("Report", { userId: userId })
              }
            >
              <Text style={ProfileDetailsStyle.buttonText}> Report</Text>
            </TouchableOpacity>
          </View>
        ) : userId && userId !== currentUser.userId ? undefined : (
          <View style={ProfileDetailsStyle.editOrCreateButtons}>
            <TouchableOpacity
              style={ProfileDetailsStyle.button}
              onPress={() =>
                navigationStack.navigate("EditProfile", {
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  phone: user?.phone,
                })
              }
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
        )}
        <View style={ProfileDetailsStyle.editOrCreateButtons}>
          {/* TODO: add navigation to feed for this user posts */}
          <TouchableOpacity
            style={ProfileDetailsStyle.button}
            onPress={() => console.log("All posts")}
          >
            <Text style={ProfileDetailsStyle.buttonText}>All Posts</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
            }}
          ></View>
          <TouchableOpacity
            style={ProfileDetailsStyle.button}
            onPress={() =>
              navigationBar.navigate("Reviews", { userId: userId })
            }
          >
            <Text style={ProfileDetailsStyle.buttonText}>Reviews</Text>
          </TouchableOpacity>
        </View>
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
