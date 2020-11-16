import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AddDriver from "../screens/screensOrg/AddDriver";
import DriversDetails from "../screens/screensOrg/DriversDetails";
import Sidebar from "../common/Sidebar";

export default function HomeNavigation() {
  const DrawerStack = createDrawerNavigator();
  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      drawerContent={(props) => <Sidebar {...props} />}>
      <DrawerStack.Screen name='Driver Details' component={DriversDetails} />
      <DrawerStack.Screen name='Add Driver' component={AddDriver} />
    </DrawerStack.Navigator>
  );
}
