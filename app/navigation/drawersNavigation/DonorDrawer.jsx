import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DonorHomeScreen from "../../screens/screensDonor/DonorHomeScreen";
import DonorSettings from "../../screens/screensDonor/DonorSettings";
import DonorNotifications from "../../screens/screensDonor/DonorNotifications";
import Sidebar from "../../common/Sidebar";
import EditProfileDonor from "../../screens/screensDonor/EditProfileDonor";
import DonationsCount from "../../screens/screensDonor/DonationsCount";
import DonationsDetails from "../../screens/screensDonor/DonationsDetails";
import DonorEmailVerification from "../../screens/screensDonor/DonorEmailVerification";

export default function DonorDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Home",
      icon: "home",
    },
    {
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
    },
    {
      name: "Settings",
      icon: "cog",
    },
  ]);

  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Home'
      headerMode='none'
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}>
      <DrawerStack.Screen
        name='Home'
        component={DonorHomeScreen}
        options={{ headerTitle: "Home" }}
      />
      <DrawerStack.Screen
        name='EmailVerificationScreen'
        component={DonorEmailVerification}
      />
      <DrawerStack.Screen name='Notifications' component={DonorNotifications} />
      <DrawerStack.Screen
        name='Donation Details'
        component={DonationsDetails}
      />
      <DrawerStack.Screen name='Donation Count' component={DonationsCount} />
      <DrawerStack.Screen name='Settings' component={DonorSettings} />
      <DrawerStack.Screen
        name='EditProfileDonor'
        component={EditProfileDonor}
        options={{ headerShown: false }}
      />
    </DrawerStack.Navigator>
  );
}
