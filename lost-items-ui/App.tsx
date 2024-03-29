import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./src/utils/AuthProvider";
import SignIn from "./src/screens/SignIn/SignIn";
import SignUp from "./src/screens/SignUp/SignUp";
import Loading from "./src/screens/Loading/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "react-query";
import { SearchFilterProvider } from "./src/utils/SearchFilterProvider";
import MoreFilters from "./src/screens/MoreFilters/MoreFilters";
import TabNavigation from "./src/TabNavigation/TabNavigation";
import { EditProfile } from "./src/screens/EditProfile/EditProfile";
import ItemDetailScreen from "./src/screens/ItemDetail/ItemDetail";
import AddFeedback from "./src/screens/AddFeedback/AddFeedback";
import Report from "./src/screens/Report/Report";
import Reviews from "./src/screens/Reviews/Reviews";
import { Profile } from "./src/screens/Profile/Profile";

export type RootStackParamList = {
  AddFeedback: { userId: string };
  Report: { userId: string };
  Reviews: { userId: string };
  SignIn: undefined;
  SignUp: undefined;
  TabNavigation: undefined;
  MoreFilters: undefined;
  Loading: undefined;
  EditProfile: {
    firstName: string | undefined;
    lastName: string | undefined;
    phone: string | undefined;
  };
  ItemDetailScreen: { itemId: string };
  Profile: { userId: string };
};

const queryClient = new QueryClient();

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <SearchFilterProvider>
            <RootSiblingParent>
              <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator initialRouteName="TabNavigation">
                  <Stack.Screen
                    name="AddFeedback"
                    component={AddFeedback}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Report"
                    component={Report}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="Loading" component={Loading} />
                  <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false, headerLeft: () => null }}
                  />
                  <Stack.Screen
                    name="MoreFilters"
                    component={MoreFilters}
                    options={{ headerShown: false, headerLeft: () => null }}
                  />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerShown: false, headerLeft: () => null }}
                    initialParams={{
                      firstName: undefined,
                      lastName: undefined,
                      phone: undefined,
                    }}
                  />
                  <Stack.Screen
                    name="Reviews"
                    component={Reviews}
                    options={{ headerShown: false, headerLeft: () => null }}
                  />
                  <Stack.Screen
                    name="ItemDetailScreen"
                    component={
                      ItemDetailScreen
                    } /* it needs some initial props :) (if it is workng dont tach it @maimoun) */
                    options={{ headerShown: false, headerLeft: () => null }}
                  />
                  <Stack.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{ headerShown: false }}
                    initialParams={{ userId: undefined }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </RootSiblingParent>
          </SearchFilterProvider>
        </AuthProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
