import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";

export default function AppNavigator({ isAuth }) {
  // const isAuth = false;
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator>
      {isAuth ? (
        <RootStack.Screen
          name="UserHome"
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="UserAuthorization"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
}
// import { createStackNavigator } from "@react-navigation/stack"; { createStackNavigator } and { NavigationContainer }
// RootStack as we are using it in <RootStack>, Caps reason?
