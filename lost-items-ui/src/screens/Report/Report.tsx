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
import styles from "./Report.styles";
import InputText from "../../components/InputText/InputText";
import { ReportUserApiCall } from "../../api/user/ReportUserApiCall";


type ReportParamProps = NativeStackScreenProps<RootStackParamList, 'Report'>;

export type ReportProps = {

} & ReportParamProps;

const Report = (props: ReportProps) => {
    const userId = props.route.params.userId;
    const [title, setTitle] = React.useState<string>('');
    const [comment, setComment] = React.useState<string>('');

    const {
        accessToken,
        refreshToken,
        setTheRefreshToken,
        setTheAccessToken,
        autoRefreshAccessToken,
    } = useAuth();

    const rootNavigation = useNavigation<BottomTabNavigationProp<ParamListBase>>();
    const [loading, setLoading] = useState<boolean>(false);

    const report = useCallback(async () => {
        try {
            setLoading(true);
            if (isTokenExpired(accessToken)) {
                if (!(await autoRefreshAccessToken(refreshToken))) {
                    rootNavigation.navigate("SignIn");
                }
            }
            const response = await ReportUserApiCall(accessToken, {
                title: title,
                comment: comment,
            }, userId);
            if (response.status === 200) {
                Toaster.show("Report Submitted Successfuly.", 1500, true, COLORS.green);
                setLoading(false);
                rootNavigation.navigate("Feed");
            } else if (response.status === 401) {
                Toaster.show(response.data.message, 1500, true, COLORS.red);
                setLoading(false);
                rootNavigation.navigate("TabNavigator");
            } else if (response.status === 404) {
                Toaster.show(response.data.message, 1500, true, COLORS.red);
                setLoading(false);
                rootNavigation.navigate("SignUp");
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
        title,
        comment,
        setLoading,
        accessToken,
        refreshToken,
        setTheAccessToken,
        setTheRefreshToken,
        autoRefreshAccessToken,
    ]);

    return (
        <View style={styles.reportContainer}>
            <View style={styles.reportHeadingTitleContainer}>
                <Text style={styles.reportHeadingTitle}>Report</Text>
            </View>
            <View style={styles.reportTitleContainer}>
                <InputText
                    page="addFeedback"
                    setValue={setTitle}
                    currentValue={title}
                    placeholder="Title..."
                    type={"default"}
                />
            </View>
            <View style={styles.reportCommentContainer}>
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
                    style={styles.reportButton}
                    onPress={() => report()}
                >
                    <Text style={styles.reportButtonText}> Report</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                    }}
                ></View>    
                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => rootNavigation.goBack()}
                >
                    <Text style={styles.reportButtonText}> Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Report;