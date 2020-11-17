import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DonorHomeScreen from "../../screens/screensDonor/DonorHomeScreen";
import Sidebar from "../../common/Sidebar";

export default function DriverDrawer() {
  const DrawerStack = createDrawerNavigator();

  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Donor Home'
      headerMode='none'
      drawerContent={(props) => <Sidebar {...props} />}>
      <DrawerStack.Screen name='Donor Home' component={DonorHomeScreen} />
    </DrawerStack.Navigator>
  );
}
