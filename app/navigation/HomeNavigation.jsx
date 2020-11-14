import React from "react";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  const DrawerStack = createDrawerNavigator();
  return (
    <DrawerStack.Navigator>
      <DrawerStack.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </DrawerStack.Navigator>
  );
}
