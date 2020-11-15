import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/screensOrg/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
