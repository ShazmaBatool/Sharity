import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SyncStorage from "sync-storage";

import AddDriver from "../../screens/screensOrg/AddDriver";
import DriversDetails from "../../screens/screensOrg/DriversDetails";
import EditProfileOrg from "../../screens/screensOrg/EditProfileOrg";
import Sidebar from "../../common/Sidebar";
import SettingsOrgScreen from "../../screens/screensOrg/SettingsOrgScreen";

export default function OrgDrawer() {
  const DrawerStack = createDrawerNavigator();
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
  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Donor Details'
      drawerContent={(props) => (
        <Sidebar {...props} routes={routes} email={email} />
      )}>
      <DrawerStack.Screen name='Driver Details' component={DriversDetails} />
      <DrawerStack.Screen name='Add Driver' component={AddDriver} />
      <DrawerStack.Screen
        name='EditProfile'
        component={EditProfileOrg}
        options={{ headerShown: false }}
      />
      <DrawerStack.Screen name='Settings' component={SettingsOrgScreen} />
    </DrawerStack.Navigator>
  );
}
