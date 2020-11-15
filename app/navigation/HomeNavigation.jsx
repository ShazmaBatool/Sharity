import React from "react";

import HomeScreen from "../screens/screensOrg/HomeScreen";
import DriversDetails from "../screens/screensOrg/DriversDetails";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../common/Sidebar";
import AddDriver from "../screens/screensOrg/AddDriver";

export default function HomeNavigation() {
  const DrawerStack = createDrawerNavigator();
  return (
    <DrawerStack.Navigator
      overlayColor="#01010abf"
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <DrawerStack.Screen name="Driver Details" component={DriversDetails} />
      <DrawerStack.Screen name="Add Driver" component={AddDriver} />
    </DrawerStack.Navigator>
  );
}
