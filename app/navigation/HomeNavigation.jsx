import React from "react";

import HomeScreen from "../screens/screensOrg/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";

export default function HomeNavigation() {
  const DrawerStack = createDrawerNavigator();
  return (
    <DrawerStack.Navigator>
      <DrawerStack.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </DrawerStack.Navigator>
  );
}
