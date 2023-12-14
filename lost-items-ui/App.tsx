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
import Feed from "./src/screens/Feed/Feed";
import PostItem from "./src/screens/PostItem/PostItem";

import { QueryClient, QueryClientProvider } from "react-query";
import { SearchFilterProvider } from "./src/utils/SearchFilterProvider";
import MoreFilters from "./src/screens/MoreFilters/MoreFilters";
import TabNavigation from "./src/TabNavigation/TabNavigation";
const queryClient = new QueryClient();

export default function App() {
  const Stack = createNativeStackNavigator();
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
                </Stack.Navigator>
              </NavigationContainer>
            </RootSiblingParent>
          </SearchFilterProvider>
        </AuthProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
