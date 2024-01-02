import { Image, Text, View } from "react-native";
import React from "react";
import FeedbackStyles from "./Feedback.styles";
import { GetUserFeedbackItemDto } from "../../typing/item";
import ViewMoreText from 'react-native-view-more-text';


type FeedbackProps = {
  feedbackDto: GetUserFeedbackItemDto;
};

export default function Feedback(props: FeedbackProps) {

  const renderViewMore = (onPress) =>{
    return(
      <Text style={FeedbackStyles.moreLess} onPress={onPress}>View more</Text>
    )
  };

  const renderViewLess = (onPress) => {
    return(
      <Text style={FeedbackStyles.moreLess} onPress={onPress}>View less</Text>
    )
  };

  return (
    <View style={FeedbackStyles.container}>
      <View style={FeedbackStyles.topContainer}>
        <View style={FeedbackStyles.userContainer}>
          <View style={FeedbackStyles.imageContainer}>
            <Image style={FeedbackStyles.image} source={{ uri: "https://media.licdn.com/dms/image/D4E03AQHseV1q9OiL2Q/profile-displayphoto-shrink_800_800/0/1667843203894?e=2147483647&v=beta&t=HlIttL7LU7xEdpMz8cS_N45mrpD0uRDgoP8pjj_XrEk" }} />
          </View>
          <Text style={FeedbackStyles.username}>{props.feedbackDto.raterName}</Text>
        </View>
        <View style={FeedbackStyles.ratingContainer}>
          <Text style={FeedbackStyles.rating}>{props.feedbackDto.rating}</Text>
          <View style={FeedbackStyles.starContainer}>
            <Image style={FeedbackStyles.image} source={require("../../assets/images/star.png")} />
          </View>
        </View>
      </View>
      <View style={FeedbackStyles.bottomContainer}>
        <ViewMoreText
          numberOfLines={2}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={FeedbackStyles.comment}
        >
          <Text >
            {props.feedbackDto.comment}
          </Text>
        </ViewMoreText>
      </View>
      </View>
      );
}
