import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DonorHomeScreen from "../../screens/screensDonor/DonorHomeScreen";
import DonorSettings from "../../screens/screensDonor/DonorSettings";
import DonorNotifications from "../../screens/screensDonor/DonorNotifications";
import EditProfileDonor from "../../screens/screensDonor/EditProfileDonor";
import Sidebar from "../../common/Sidebar";

export default function DonorDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Donation Details",
      icon: "hand-holding-heart",
    },
    {
      name: "Donation Count",
      icon: "id-card",
    },
    {
      name: "Notifications",
      icon: "envelope",
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
      headerMode='none'
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}>
      <DrawerStack.Screen name='Donation Details' component={DonorHomeScreen} />
      <DrawerStack.Screen name='Donation Count' component={DonorHomeScreen} />
      <DrawerStack.Screen name='Notifications' component={DonorNotifications} />
      <DrawerStack.Screen name='Settings' component={DonorSettings} />
      <DrawerStack.Screen
        name='EditProfileDonor'
        component={EditProfileDonor}
        options={{ headerShown: false }}
      />
    </DrawerStack.Navigator>
  );
}
