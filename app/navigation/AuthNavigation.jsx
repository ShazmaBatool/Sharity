import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";

export default function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
