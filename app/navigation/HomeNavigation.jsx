import React from "react";

import HomeScreen from "../HomeScreen";
import DetailsScreen from "../DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
