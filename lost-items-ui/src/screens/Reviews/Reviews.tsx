
import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import styles from "./Reviews.styles";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useAuth } from '../../utils/AuthProvider';
import { getFeedbacksInfiniteQuery } from '../../api/feedback/GetFeedbacksInfiniteQuery';
import { COLORS } from '../../styles/theme';
import { FlashList } from '@shopify/flash-list';
import Feedback from '../../components/Feedback/Feedback';
import { FontAwesome } from '@expo/vector-icons';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Reviews'>;

const Reviews = ({ route, navigation }: ProfileProps) => {
    const { width, height } = Dimensions.get("window");
    const factor = width * height > 600000 ? 2 : 1;

    const userId = route.params.userId;
    const currentUser = useAuth();
    const result = getFeedbacksInfiniteQuery(currentUser.accessToken, userId ? userId : null);

    const handleEndReached = () => {
        if (!result.isLoading && result.hasNextPage) {
            result.fetchNextPage();
        }
    };

    if (result.isLoading)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={COLORS.tertiary} />
            </View>
        );

    if (result.isError) return <Text>{result.error.message}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <FontAwesome 
                    name={"close"} 
                    size={30 * factor} 
                    color={COLORS.black} 
                    style={styles.closeIcon}
                    onPress={() => navigation.goBack()} 
                    />
                <Text style={styles.header}>Reviews</Text>
            </View>
            <View style={styles.reviewsContainer} >
                <FlashList
                    data={result.data?.pages.flatMap((page) => page.feedbacks)}
                    contentContainerStyle={{
                        padding: 10 * factor,
                        paddingBottom: 50,
                    }}
                    renderItem={({ item, index }) => (
                        <Feedback
                            key={index}
                            feedbackDto={item}
                        />
                    )}
                    numColumns={factor}
                    estimatedFirstItemOffset={20}
                    estimatedItemSize={100}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.8}
                    ListEmptyComponent={() => <Text>NO DATA</Text>}
                    ListFooterComponent={() =>
                        result.isFetchingNextPage ? (
                            <ActivityIndicator
                                style={{
                                    marginTop: 10,
                                }}
                                size="large"
                                color={COLORS.tertiary}
                            />
                        ) : (
                            <></>
                        )
                    }
                />
            </View>
        </View >

    );
};

export default Reviews;