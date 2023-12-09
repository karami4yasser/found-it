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
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <RootSiblingParent>
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack.Navigator initialRouteName="SignIn">
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
                  name="Feed"
                  component={Feed}
                  options={{ headerShown: false, headerLeft: () => null }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </RootSiblingParent>
        </AuthProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
