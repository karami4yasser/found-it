import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../utils/AuthProvider';
import { GetCurrentUserDetailsApiCall } from '../../api/user/GetCurrentUserDetailsApiCall';
import Toaster from '../../utils/Toaster';
import { COLORS } from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';
import { isTokenExpired } from '../../utils/isTokenExpired';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function ProfileDummy() {
    type UserDetail = {
        firstName: string,
        lastName: string,
        phone: string,
    }
    const { accessToken, refreshToken,setTheRefreshToken, setTheAccessToken, autoRefreshAccessToken } = useAuth();
    const [user, setUser] = useState<UserDetail | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const logOut = useCallback(() => {
        navigateToRout("SignIn");
        setTheAccessToken("");
        setTheRefreshToken("");
    }, [setTheAccessToken, setTheRefreshToken]);
    
    const navigateToRout = (routName: string) => {
        navigation.reset({
            index: 0,
            routes: [{ name: routName }],
        });
    };

    const fetchUserDetails = useCallback(async () => {
        if (accessToken !== null && refreshToken !== "") {
            try {
                if (isTokenExpired(accessToken)) {
                    if (!(await autoRefreshAccessToken(refreshToken))) {
                        navigateToRout("SignIn");
                    }
                }
                const response = await GetCurrentUserDetailsApiCall(accessToken);
                if (response.status === 200) {
                    setUser(response.data);
                    Toaster.show('User details retrieved successfully.', 1500, true, COLORS.green);
                } else if (response.status === 401) {
                    Toaster.show(response.data.message, 1500, true, COLORS.red);
                    navigateToRout("SignIn");
    
                } else if (response.status === 404) {
                    Toaster.show(response.data.message, 1500, true, COLORS.red);
                    navigateToRout("SignUp");
    
                } else if (response.status === 400) {
                    response.data.errors.forEach((err: any) => {
                        Toaster.show(err, 1500, true, COLORS.red);
                    });
                } else {
                    Toaster.show('User error!', 1500, true, COLORS.red);
                }
            } catch (error) {
                Toaster.show('User Error!', 1500, true, COLORS.red);
            }
        }
    }, [accessToken, refreshToken, setTheAccessToken]);

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    return (
        <View style={globalStyles.container}>
            <View style={{ marginTop: '20%', backgroundColor: 'yellow' }}>
                <Text>Profile Dummy</Text><Pressable style={{backgroundColor:"blue"}} onPress={logOut}>
                            <Text >Logout</Text>
                        </Pressable>
                {user && (
                    <View style={{ flexDirection: 'column' }}>
                        <Text>{user.firstName}</Text>
                        <Text>{user.lastName}</Text>
                        <Text>{user.phone}</Text>
                        <Pressable style={{backgroundColor:"red"}} onPress={fetchUserDetails}>
                            <Text >Reload</Text>
                        </Pressable>
                        <Pressable style={{backgroundColor:"blue"}} onPress={logOut}>
                            <Text >Logout</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}
