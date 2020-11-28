import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DriverHomeScreen from "../../screens/screensDriver/DriverHomeScreen";
import Sidebar from "../../common/Sidebar";
import DriverNotifications from "../../screens/screensDriver/DriverNotifications";
import TripsDetails from "../../screens/screensDriver/TripsDetails";
import DriverSettings from "../../screens/screensDriver/DriverSettings";

export default function DriverDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Notifications",
      icon: "bell",
    },
    {
      name: "Home",
      icon: "bell",
    },
    {
      name: "Trips Details",
      icon: "id-card",
    },

    {
      name: "Settings",
      icon: "cog",
    },
  ]);

  return (
    <DrawerStack.Navigator
      overlayColor="#01010abf"
      initialRouteName="Home"
      headerMode="none"
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}
    >
      <DrawerStack.Screen name="Home" component={DriverHomeScreen} />
      <DrawerStack.Screen
        name="Driver Notifications"
        component={DriverNotifications}
      />

      <DrawerStack.Screen name="Trips Details" component={TripsDetails} />
      <DrawerStack.Screen name="Settings" component={DriverSettings} />
    </DrawerStack.Navigator>
  );
}
