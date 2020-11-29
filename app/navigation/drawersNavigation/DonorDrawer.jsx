import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DonorHomeScreen from "../../screens/screensDonor/DonorHomeScreen";
import DonorSettings from "../../screens/screensDonor/DonorSettings";
import DonorNotifications from "../../screens/screensDonor/DonorNotifications";
import EditProfileDonor from "../../screens/screensDonor/EditProfileDonor";
import Sidebar from "../../common/Sidebar";
import EditProfileDonor from "../../screens/screensDonor/EditProfileDonor";
import DonationsCount from "../../screens/screensDonor/DonationsCount";
import DonationsDetails from "../../screens/screensDonor/DonationsDetails";
import DonorNotifications from "../../screens/screensDonor/DonorNotifications";

export default function DonorDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
<<<<<<< HEAD
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
=======
      name: "Notifications",
      icon: "bell",
    },
    {
      name: "Donation Details",
      icon: "id-card",
    },
    {
      name: "Donation Count",
      icon: "donate",
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
    },
    {
      name: "Settings",
      icon: "cog",
    },
  ]);
<<<<<<< HEAD
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
=======

  return (
    <DrawerStack.Navigator
      overlayColor="#01010abf"
      initialRouteName="DonorHomeScreen"
      headerMode="none"
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}
    >
      <DrawerStack.Screen name="DonorHomeScreen" component={DonorHomeScreen} />
      <DrawerStack.Screen
        name="Donor Notifications"
        component={DonorNotifications}
      />
      <DrawerStack.Screen
        name="Donation Details"
        component={DonationsDetails}
      />
      <DrawerStack.Screen name="Donation Count" component={DonationsCount} />
      <DrawerStack.Screen name="Settings" component={DonorSettings} />
      <DrawerStack.Screen
        name="EditProfileDonor"
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
        component={EditProfileDonor}
        options={{ headerShown: false }}
      />
    </DrawerStack.Navigator>
  );
}
