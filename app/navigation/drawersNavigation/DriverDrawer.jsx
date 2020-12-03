import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DriverHomeScreen from "../../screens/screensDriver/DriverHomeScreen";
import DriverNotifications from "../../screens/screensDriver/DriverNotifications";
import DriverSettings from "../../screens/screensDriver/DriverSettings";
import TripsDetails from "../../screens/screensDriver/TripsDetails";
import DriverMapScreen from "../../screens/screensDriver/DriverMapScreen";
import DriverEditProfile from "../../screens/screensDriver/DriverEditProfile";
import Sidebar from "../../common/Sidebar";

export default function DriverDrawer() {
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
      name: "Map",
      icon: "map",
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
      overlayColor='#01010abf'
      initialRouteName='MapScreen'
      headerMode='none'
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}>
      <DrawerStack.Screen name='Home' component={DriverHomeScreen} />
      <DrawerStack.Screen
        name='Map'
        component={DriverMapScreen}
        options={{ headerTitle: "Map" }}
      />
      <DrawerStack.Screen
        name='Driver Notifications'
        component={DriverNotifications}
        options={{ headerTitle: "Notifications" }}
      />

      <DrawerStack.Screen name='Trips Details' component={TripsDetails} />
      <DrawerStack.Screen name='Settings' component={DriverSettings} />
      <DrawerStack.Screen
        name='EditProfile'
        component={DriverEditProfile}
        options={{ headerShown: false }}
      />
    </DrawerStack.Navigator>
  );
}
