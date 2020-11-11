import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";

export default function AppNavigator() {
  const isAuth = null;
  const Stack = createStackNavigator();
  return <>{isAuth ? <HomeNavigation /> : <AuthNavigation />}</>;
}

{
  /* <>
          {" "}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />{" "}
        </> */
}
