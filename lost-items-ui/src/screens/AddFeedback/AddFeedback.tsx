import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../utils/AuthProvider";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import Toaster from "../../utils/Toaster";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { COLORS } from "../../styles/theme";
import { AddFeedbackApiCall } from "../../api/feedback/AddFeedbackApiCall";
import styles from "./AddFeedback.styles";
import InputText from "../../components/InputText/InputText";
import StarRating from "react-native-star-rating-widget";

type AddFeedbackParamProps = NativeStackScreenProps<
  RootStackParamList,
  "AddFeedback"
>;

export type AddFeedbackProps = {} & AddFeedbackParamProps;

const AddFeedback = (props: AddFeedbackProps) => {
  const userId = props.route.params.userId;
  const [rating, setRating] = React.useState<number>(1);
  const [comment, setComment] = React.useState<string>("");

  const onStarRatingPress = (rating: number) => {
    if (rating < 1) setRating(1);
    else setRating(rating);
  };

  const {
    accessToken,
    refreshToken,
    setTheRefreshToken,
    setTheAccessToken,
    autoRefreshAccessToken,
  } = useAuth();

  const rootNavigation =
    useNavigation<BottomTabNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState<boolean>(false);

  const addFeedback = useCallback(async () => {
    try {
      setLoading(true);
      if (isTokenExpired(accessToken)) {
        if (!(await autoRefreshAccessToken(refreshToken))) {
          rootNavigation.navigate("TabNavigator");
        }
      }
      const response = await AddFeedbackApiCall(
        accessToken,
        {
          rating: rating,
          comment: comment,
        },
        userId
      );
      if (response.status === 200) {
        Toaster.show(
          "Feedback Submitted Successfuly.",
          1500,
          true,
          COLORS.green
        );
        setLoading(false);
        rootNavigation.navigate("Feed");
      } else if (response.status === 201) {
        Toaster.show("Feedback Updated Successfuly.", 1500, true, COLORS.green);
        setLoading(false);
        rootNavigation.navigate("Feed");
      } else if (response.status === 401) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setLoading(false);
        rootNavigation.navigate("TabNavigator");
      } else if (response.status === 404) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setLoading(false);
        rootNavigation.navigate("TabNavigator");
      } else if (response.status === 400 && response.data.errors) {
        response.data.errors.forEach((err: any) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
        setLoading(false);
      } else if (response.status === 400 && response.data.message) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        rootNavigation.navigate("Feed");
        setLoading(false);
      } else {
        console.log(JSON.stringify(response));
        Toaster.show("Unknown error 1!", 1500, true, COLORS.red);
        setLoading(false);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      Toaster.show("Unknown Error 2!", 1500, true, COLORS.red);
      setLoading(false);
    }
  }, [
    loading,
    rating,
    comment,
    setLoading,
    accessToken,
    refreshToken,
    setTheAccessToken,
    setTheRefreshToken,
    autoRefreshAccessToken,
  ]);

  return (
    <View style={styles.addFeedbackContainer}>
      <View style={styles.addFeedbackHeadingTitleContainer}>
        <Text style={styles.addFeedbackHeadingTitle}>Add Feedback</Text>
      </View>
      <View style={styles.addFeedbackRatingContainer}>
        <StarRating
          style={styles.addFeedbackRating}
          rating={rating}
          onChange={onStarRatingPress}
          enableHalfStar={false}
          starSize={60}
          color={COLORS.tertiary}
        />
      </View>
      <View style={styles.addFeedbackCommentContainer}>
        <InputText
          page="addFeedback"
          setValue={setComment}
          currentValue={comment}
          placeholder="Comment..."
          type={"default"}
          numberOfLines={10}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.addFeedbackButton}
          onPress={() => addFeedback()}
        >
          <Text style={styles.addFeedbackButtonText}> Add Feedback</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        ></View>
        <TouchableOpacity
          style={styles.addFeedbackButton}
          onPress={() => rootNavigation.goBack()}
        >
          <Text style={styles.addFeedbackButtonText}> Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFeedback;
