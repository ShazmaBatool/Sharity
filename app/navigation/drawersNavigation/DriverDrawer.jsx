import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SyncStorage from "sync-storage";

import Sidebar from "../../common/Sidebar";
import DriverMapScreen from "../../screens/screensDriver/DriverMapScreen";

export default function DriverDrawer() {
  const [routes] = React.useState([
    {
      name: "Driver Details",
      icon: "ios-document",
    },
    {
      name: "Add Driver",
      icon: "md-add-circle",
    },
    {
      name: "Settings",
      icon: "ios-settings",
    },
  ]);
  const email = SyncStorage.get("@userEmail");
  const DrawerStack = createDrawerNavigator();

  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='MapScreen'
      headerMode='none'
      drawerContent={(props) => (
        <Sidebar {...props} routes={routes} email={email} />
      )}>
      <DrawerStack.Screen name='MapScreen' component={DriverMapScreen} />
    </DrawerStack.Navigator>
  );
}
