import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/screensOrg/SignInScreen";
import WelcomeOrgScreen from "../screens/screensOrg/WelcomeOrgScreen";

export default function OrgNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WelcomeOrg' component={WelcomeOrgScreen} />
      <Stack.Screen name='SignIn' component={SignInScreen} />
    </Stack.Navigator>
  );
}
