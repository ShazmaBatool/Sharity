import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInDonor from "../screens/screensDonor/SignInDonor";
import SignUpDonor from "../screens/screensDonor/SignUpDonor";
import WelcomeDonorScreen from "../screens/screensDonor/WelcomeDonorScreen";
import ForgotPassword from "../screens/screensDonor/ForgotPassword";

export default function DonorNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeDonor" component={WelcomeDonorScreen} />
      <Stack.Screen name="SignInDonor" component={SignInDonor} />
      <Stack.Screen name="SignUpDonor" component={SignUpDonor} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
