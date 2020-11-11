import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";

export default function AppNavigator() {
  const isAuth = false;
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator>
      {isAuth ? (
        <RootStack.Screen
          name="Home"
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
}

{
  /* <>
          {" "}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />{" "}
        </> */
}
