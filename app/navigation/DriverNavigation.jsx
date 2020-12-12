import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInDriver from "../screens/screensDriver/SignInDriver";
import WelcomeDriverScreen from "../screens/screensDriver/WelcomeDriverScreen";
import PhoneSignIn from "../screens/screensDriver/PhoneSignIn";
import InputOTPScreen from "../screens/screensDriver/InputOTPScreen";

export default function DriverNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WelcomeDriver' component={WelcomeDriverScreen} />
      <Stack.Screen name='SignInDriver' component={SignInDriver} />
      <Stack.Screen name='PhoneSignIn' component={PhoneSignIn} />
      <Stack.Screen name='InputOTP' component={InputOTPScreen} />
    </Stack.Navigator>
  );
}
