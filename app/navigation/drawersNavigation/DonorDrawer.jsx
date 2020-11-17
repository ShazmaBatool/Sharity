import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SyncStorage from "sync-storage";

import DonorHomeScreen from "../../screens/screensDonor/DonorHomeScreen";
import DonorSettings from "../../screens/screensDonor/DonorSettings";
import Sidebar from "../../common/Sidebar";

export default function DonorDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Donor Details",
      icon: "ios-document",
    },
    {
      name: "Add Donor",
      icon: "md-add-circle",
    },

    {
      name: "Settings",
      icon: "ios-settings",
    },
  ]);
  const email = SyncStorage.get("@userEmail");
  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Donor Details'
      headerMode='none'
      drawerContent={(props) => (
        <Sidebar {...props} routes={routes} email={email} />
      )}>
      <DrawerStack.Screen name='Donor Details' component={DonorHomeScreen} />
      <DrawerStack.Screen name='Add Donor' component={DonorHomeScreen} />
      <DrawerStack.Screen name='Settings' component={DonorSettings} />
    </DrawerStack.Navigator>
  );
}
