import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import Feed from "../screens/Feed/Feed";
import { Notifications } from "../screens/Notifications/Notifications";
import { Profile } from "../screens/Profile/Profile";
import PostItem from "../screens/PostItem/PostItem";
import { useAuth } from "../utils/AuthProvider";
import SignIn from "../screens/SignIn/SignIn";

export type TabRootStackParamList = {
  Profile: { userId: string };
  Feed: undefined;
  Post: undefined;
  SignIn: undefined;
  Notifications: undefined;
};

//Screen names
const feedName = "Feed";
const profileName = "Profile";
const postName = "Post";
const notificationsName = "Notifications";
const signInName = "SignIn";
const Tab = createBottomTabNavigator<TabRootStackParamList>();

function TabNavigation() {
  const currentUser = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "feed" : "feed";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
          } else if (route.name === "Post") {
            iconName = focused ? "plus" : "plus";
          } else if (route.name === "Notifications") {
            iconName = focused ? "bell" : "bell-o";
          } else if (route.name === "SignIn") {
            iconName = focused ? "sign-in" : "sign-in";
          }
          // You can return any component that you like here!
          return (
            <FontAwesome name={iconName as any} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={feedName}
        component={Feed}
        options={{ headerShown: false }}
      />
      {currentUser.accessToken && (
        <>
          <Tab.Screen
            name={postName}
            component={PostItem}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={notificationsName}
            component={Notifications}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={profileName}
            component={Profile}
            options={{ headerShown: false }}
            initialParams={{ userId: currentUser.userId }}
          />
        </>
      )}

      {!currentUser.accessToken && (
        <>
          <Tab.Screen
            name={signInName}
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default TabNavigation;
