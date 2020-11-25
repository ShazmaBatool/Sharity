import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInOrg from "../screens/screensOrg/SignInOrg";
import WelcomeOrgScreen from "../screens/screensOrg/WelcomeOrgScreen";
import OrgHomeScreen from "../screens/screensOrg/OrgHomeScreen";

export default function OrgNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeOrg" component={WelcomeOrgScreen} />
      <Stack.Screen name="SignIn" component={SignInOrg} />
      <Stack.Screen name="OrgHomeScreen" component={OrgHomeScreen} />
    </Stack.Navigator>
  );
}
