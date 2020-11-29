import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AddDriver from "../../screens/screensOrg/AddDriver";
import DonationsDetails from "../../screens/screensOrg/DonationsDetails";
import DonationsCount from "../../screens/screensOrg/DonationsCount";
import DriversDetails from "../../screens/screensOrg/DriversDetails";
import EditProfileOrg from "../../screens/screensOrg/EditProfileOrg";
import OrgNotifications from "../../screens/screensOrg/OrgNotifications";
import Sidebar from "../../common/Sidebar";
import SettingsOrgScreen from "../../screens/screensOrg/SettingsOrgScreen";
import HomeScreen from "../../screens/screensOrg/HomeScreen";

export default function OrgDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Donation Details",
      icon: "id-card",
    },
    {
      name: "Donation Count",
      icon: "donate",
    },
    {
      name: "Add Driver",
      icon: "user-plus",
    },
    {
      name: "Driver Details",
      icon: "motorcycle",
    },
    {
      name: "Notifications",
      icon: "bell",
    },
    {
      name: "Settings",
      icon: "cog",
    },
  ]);
  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Donation Details'
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}>
      <DrawerStack.Screen name='Donation Details' component={HomeScreen} />
      <DrawerStack.Screen name='Donation Count' component={DonationsCount} />
      <DrawerStack.Screen name='Driver Details' component={DriversDetails} />
      <DrawerStack.Screen name='Add Driver' component={AddDriver} />
      <DrawerStack.Screen name='Notifications' component={OrgNotifications} />
      <DrawerStack.Screen
        name='EditProfile'
        component={EditProfileOrg}
        options={{ headerShown: false }}
      />
      <DrawerStack.Screen name='Settings' component={SettingsOrgScreen} />
    </DrawerStack.Navigator>
  );
}
