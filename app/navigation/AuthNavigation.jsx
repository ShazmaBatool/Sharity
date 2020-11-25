import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrgNavigation from "./OrgNavigation";
import DonorNavigation from "./DonorNavigation";
import DriverNavigation from "./DriverNavigation";
import SignInOrg from "../screens/screensOrg/SignInOrg";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInOrg} />
      <Stack.Screen name="Org" component={OrgNavigation} />
      <Stack.Screen name="Donor" component={DonorNavigation} />
      <Stack.Screen name="Driver" component={DriverNavigation} />
    </Stack.Navigator>
  );
}
