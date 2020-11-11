import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../SignInScreen";
import SignUpScreen from "../SignUpScreen";

export default function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
